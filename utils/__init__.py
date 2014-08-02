from functools import wraps
from redis import Redis, StrictRedis
from rq import Queue
import ujson

redis_conn = StrictRedis()
# no args implies the default queue
q = Queue(connection=redis_conn)







########## decorator stuff ############

from django.http import HttpResponse

def to_json(f):
    @wraps(f)
    def _decorator_func(*args, **kwargs):
        result = f(*args, **kwargs)
        return HttpResponse(ujson.dumps(result),
                            content_type="application/json"
               )
    return _decorator_func
