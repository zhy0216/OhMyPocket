from functools import wraps
from redis import Redis, StrictRedis
from rq import Queue
import ujson

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
        print "request.user.id:%s"%request.user.id
        if request.user.id is None:
            raise NotAuthenticated("require login")
        return f(request, *args, **kwargs)
    return _decorator_func






