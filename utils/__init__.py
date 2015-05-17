from functools import wraps

from redis import Redis, StrictRedis
from rq import Queue
import ujson

from search.whoosh_redis_storage import RedisStore

redis_conn = StrictRedis()
# no args implies the default queue
q = Queue(connection=redis_conn)







########## decorator stuff ############

from django.http import HttpResponse
from api.exceptions import APIException, NotAuthenticated
from django.http import Http404
def to_json(f):
    @wraps(f)
    def _decorator_func(*args, **kwargs):
        try:
            result = f(*args, **kwargs)
        except APIException as api_exception:
            result = api_exception.to_dict()
            result["ok"] = False
        except Http404 as not_found_exception:
            result = {
                "status_code": 404,
                "detail": "resource not found"
            }
            result["ok"] = False

        if "ok" not in result:
            result["ok"] = True
            result["status_code"] = 200
        return HttpResponse(ujson.dumps(result),
                            content_type="application/json"
               )
    return _decorator_func

def required_login(f):
    @wraps(f)
    def _decorator_func(request, *args, **kwargs):
        # print "request.user.is_authenticated():%s"%request.user.is_authenticated()
        if not request.user.is_authenticated():
            raise NotAuthenticated("require login")
        return f(request, *args, **kwargs)
    return _decorator_func

def _get_whoosh_ix():
    # refer to flask-whooshalchemy
    # use FileStorage

    ix = {}
    def _(schemaName, schema):
        storage = RedisStore(redis_conn, schemaName)
        # print "ix.get(schemaName):%s"%ix.get(schemaName)
        if ix.get(schemaName) is None:
            if storage.folder_exists(schemaName): ## problem here
                ix[schemaName] = storage.open_index()
            else:
                # print "create Index"
                ix[schemaName] = storage.create_index(schema)
        return ix.get(schemaName)

    return _


get_whoosh_ix = _get_whoosh_ix()




