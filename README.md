OhMyPocket --- opensource port of [getpocket.com](getpocket.com)
===========

bookmark your favorite article


website: [http://ohmypocket.com/](http://ohmypocket.com/)
[chrome extension](https://chrome.google.com/webstore/detail/ohmypocket/fohphbjhkhgnkcpbjfieodolhbllaeff)


## run rq

`DJANGO_SETTINGS_MODULE=blue.settings rqworker`

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
```
