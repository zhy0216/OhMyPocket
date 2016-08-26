OhMyPocket --- opensource port of [getpocket.com](https://getpocket.com/)
===========

bookmark your favorite article and explore [Serendipity](http://en.wikipedia.org/wiki/Serendipity)

website: [http://ohmypocket.lazyang.com/](http://ohmypocket.lazyang.com/)

[chrome extension](https://chrome.google.com/webstore/detail/ohmypocket/fohphbjhkhgnkcpbjfieodolhbllaeff)


## compile less and require.js

> lessc and r.js is required

`fab compile_less` && `fab compile_js`

## run rq

`python myworker.py`

## install libmysqlclient-dev to install mysql-python  

`sudo apt-get install libmysqlclient-dev`

`sudo apt-get install libxml2-dev libxslt1-dev python-dev`


## deploy note

`gunicorn blue.wsgi --bind 127.0.0.1:8000 --pid /tmp/gunicorn.pid`


*supervisor config*
```
[program:pocket]
command=/home/yang/workspace/random-read/env/bin/gunicorn blue.wsgi --bind 127.0.0.1:8989 --pid /tmp/gunicorn.pid;
directory=/home/yang/workspace/random-read
user=yang

autostart=true
autorestart=true


[program:myworker]
; from http://python-rq.org/ 
; Point the command to the specific rqworker command you want to run.
; If you use virtualenv, be sure to point it to
; /path/to/virtualenv/bin/rqworker
; Also, you probably want to include a settings module to configure this
; worker.  For more info on that, see http://python-rq.org/docs/workers/
command=/home/yang/workspace/random-read/env/bin/rqworker
process_name=%(program_name)s-%(process_num)s
environment = DJANGO_SETTINGS_MODULE=blue.settings
; If you want to run more than one worker instance, increase this
numprocs=3

; This is the directory from which RQ is ran. Be sure to point this to the
; directory where your source code is importable from
directory=/home/yang/workspace/random-read

; RQ requires the TERM signal to perform a warm shutdown. If RQ does not die
; within 10 seconds, supervisor will forcefully kill it
stopsignal=TERM
; These are up to you
autostart=true
autorestart=true

```


## TODO
- [ ] user can choose the language he interested in
- [ ] cross sub-domain auth
- [ ] reposive design
- [ ] make donation button :D







