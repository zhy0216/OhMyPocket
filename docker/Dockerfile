FROM ubuntu:14.04
MAINTAINER Yang 
RUN apt-get update
### https://github.com/kstaken/dockerfile-examples/blob/master/mysql-server/Dockerfile

ADD ./mysql-setup.sh /tmp/mysql-setup.sh
RUN /bin/sh /tmp/mysql-setup.sh
CMD ["/usr/sbin/mysqld"]


## python related
RUN apt-get install -y python-software-properties python python-setuptools git
RUN apt-get install -y libmysqlclient-dev
RUN apt-get install -y libxml2-dev libxslt1-dev python-dev
RUN easy_install pip
RUN mkdir -p /www/mypocket/static/dowload-image

## nodejs

RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs

RUN npm -g install less requirejs


## Redis
### https://github.com/dockerfile/redis/blob/master/Dockerfile
    # Install Redis.
    RUN \
      cd /tmp && \
      wget http://download.redis.io/redis-stable.tar.gz && \
      tar xvzf redis-stable.tar.gz && \
      cd redis-stable && \
      make && \
      make install && \
      cp -f src/redis-sentinel /usr/local/bin && \
      mkdir -p /etc/redis && \
      cp -f *.conf /etc/redis && \
      rm -rf /tmp/redis-stable* && \
      sed -i 's/^\(bind .*\)$/# \1/' /etc/redis/redis.conf && \
      sed -i 's/^\(daemonize .*\)$/# \1/' /etc/redis/redis.conf && \
      sed -i 's/^\(dir .*\)$/# \1\ndir \/data/' /etc/redis/redis.conf && \
      sed -i 's/^\(logfile .*\)$/# \1/' /etc/redis/redis.conf

    # Define mountable directories.
    VOLUME ["/data"]

    # Define working directory.
    WORKDIR /data

    # Define default command.
    CMD ["redis-server", "/etc/redis/redis.conf"]

    # Expose ports.
    EXPOSE 6379


### nginx
    RUN \
      add-apt-repository -y ppa:nginx/stable && \
      apt-get update && \
      apt-get install -y nginx && \
      rm -rf /var/lib/apt/lists/* && \
      echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
      chown -R www-data:www-data /var/lib/nginx

    # Define mountable directories.
    VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

    # Define working directory.
    WORKDIR /etc/nginx

    # Define default command.
    CMD ["nginx"]

    # Expose ports.
    EXPOSE 80
    EXPOSE 443

## project
RUN git clone https://github.com/zhy0216/OhMyPocket.git

WORKDIR /OhMyPocket
RUN pip install -r dev_requirements.txt
RUN fab compile_less && fab compile_js
RUN python myworker.py > worklog &
RUN python manage.py syncdb
RUN python manage.py runserver

















