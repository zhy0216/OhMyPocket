from django.shortcuts import render
from django.shortcuts import redirect
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from utils import q, to_json, redis_conn, required_login
from api.exceptions import AuthenticationFailed, ParseError
# Create your views here.

@to_json
@require_http_methods(["POST"])
def user_login(request):
    username = request.POST.get("username") or None
    password = request.POST.get("password") or None
    user = authenticate(username=username, password=password)

    if not user:
        raise AuthenticationFailed("username or password error")

    login(request, user)
    return {}

@to_json
@require_http_methods(["POST"])
def user_register(request):
    username = request.POST.get("username") or None
    password = request.POST.get("password") or None
    try:
        user = User.objects.create_user(username, username, password)
    except:
        raise ParseError("username has exsists")

    return {}


@to_json
def check_user_login(request):
    if request.user.is_authenticated():
        return {"is_login": True}
    return {"is_login": False}

@to_json
def user_logout(request):
    logout(request)
    return {}




