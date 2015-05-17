
###
## http://www.creapptives.com/post/32262168370/python-whoosh-with-redis-storage
###

"""
Redis storage adapter for Whoosh (the absolute dirty way).
Copyright (c) 2012 Zohaib Sibte Hassan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""
import os
from cStringIO import StringIO
from threading import Lock

from whoosh.index import _DEF_INDEX_NAME
from whoosh.filedb.structfile import StructFile
from whoosh.filedb.filestore import Storage
from whoosh.util import random_name
from whoosh.index import TOC, FileIndex, _DEF_INDEX_NAME

class RedisStore(Storage):
    """Storage object that keeps the index in redis.
    """
    supports_mmap = False

    def __file(self, name):
        return self.redis.hget("RedisStore:%s" % self.folder, name)

    def __init__(self, redis, namespace='redis_store'):
        self.folder = namespace 
        self.redis = redis
        self.locks = {}

    def create_index(self, schema, indexname=_DEF_INDEX_NAME):
        if self.readonly:
            raise ReadOnlyError

        TOC.create(self, schema, indexname)
        return FileIndex(self, schema, indexname)

    def file_modified(self, name):
        return -1

    # def open_index(self, indexname=_DEF_INDEX_NAME, schema=None):
    #     return open_index(self, schema, indexname)

    def list(self):
        return self.redis.hkeys("RedisStore:%s" % self.folder)

    def clean(self):
        self.redis.delete("RedisStore:%s" % self.folder)

    def total_size(self):
        return sum(self.file_length(f) for f in self.list())

    def folder_exists(self, name):
        return self.redis.exists("RedisStore:%s" % self.folder)

    def file_exists(self, name):
        return self.redis.hexists("RedisStore:%s" % self.folder, name)

    def file_length(self, name):
        if not self.file_exists(name):
            raise NameError
        return len(self.__file(name))

    def delete_file(self, name):
        if not self.file_exists(name):
            raise NameError
        self.redis.hdel("RedisStore:%s" % self.folder, name)

    def rename_file(self, name, newname, safe=False):
        if not self.file_exists(name):
            raise NameError("File %r does not exist" % name)
        if safe and self.file_exists(newname):
            raise NameError("File %r exists" % newname)

        content = self.__file(name)
        pl = self.redis.pipeline()
        pl.hdel("RedisStore:%s" % self.folder, name)
        pl.hset("RedisStore:%s" % self.folder, newname, content)
        pl.execute()

    def create_file(self, name, **kwargs):
        def onclose_fn(sfile):
            self.redis.hset("RedisStore:%s" % self.folder, name, sfile.file.getvalue())
        f = StructFile(StringIO(), name=name, onclose=onclose_fn)
        return f

    def open_file(self, name, *args, **kwargs):
        # print "open file : %s ==> %s" % (self.folder, name)
        if not self.file_exists(name):
            raise NameError("No such file %r" % name)
        def onclose_fn(sfile):
            self.redis.hset("RedisStore:%s" % self.folder, name, sfile.file.getvalue())
        #print "Opened file %s %s " % (name, self.__file(name))
        return StructFile(StringIO(self.__file(name)), name=name, onclose=onclose_fn, *args, **kwargs)

    def temp_storage(self, name=None):
        name = name or "%s.tmp" % random_name()
        tempstore = RedisStore(self.redis, name)
        return tempstore.create()


    def lock(self, name):
        if name not in self.locks:
            self.locks[name] = Lock()
        return self.locks[name]

