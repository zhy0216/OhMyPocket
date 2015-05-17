#!/usr/bin/env python
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "blue.settings")
import sys
from rq import Queue, Connection, Worker

# Preload libraries
from utils import redis_conn

import jieba.analyse # import this to load dict

# Provide queue names to listen to as arguments to this script,
# similar to rqworker
with Connection(connection=redis_conn):
    qs = map(Queue, sys.argv[1:]) or [Queue()]

    w = Worker(qs)
    w.work()
