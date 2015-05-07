# -*- coding: utf-8 -*-

import os
import logging

from fabric.api import local
from fabric.context_managers import lcd

_warn = logging.warn
CURRENT_PATH = os.path.join(os.getcwd(),os.path.dirname(__file__))

def cleaning():
    """Delete all pyc and *.orig files in project directories."""
    local("find . -name '*.orig' -exec rm -i {} \;")
    local("find . -type f -name '*.pyc' -exec rm {} \;")

def update_req():
    """Updating requirements for pip"""
    # check whether in virtualenv
    if not os.environ.get("VIRTUAL_ENV"):
        _warn("You are not in an Virtualenv, please activate it first")
        return
    local("pip freeze|grep -v distribute > %s/dev_requirements.txt" % CURRENT_PATH)
    
def watch_less():
    """watch less"""
    local('watchmedo shell-command --patterns="*.less" ' + 
            "--recursive --command='lessc %s/web/static/style.less "%CURRENT_PATH +
             "> %s/web/static/style.css'"%CURRENT_PATH )
    
def compile_less():
    """compile less"""
    local("lessc %s/web/static/style.less "%CURRENT_PATH +
             "> %s/web/static/style.css"%CURRENT_PATH )     

def compile_js():
    """compile js"""
    with lcd("%s/web/static"%CURRENT_PATH):
        local("r.js -o build.js")    

def send_files():
    '''send file to my vps'''
    local('scp web/static/style.css vps:/home/yang/static')
    local('scp web/static/main_bundle.js vps:/home/yang/static')







