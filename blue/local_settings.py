# -*- coding: utf-8 -*-

DATABASES = {
    'default': {
        "ENGINE": 'django.db.backends.mysql',
        'NAME': 'random_read',
        'USER': 'root',
        'PASSWORD': 'yangz'
    },

    'test': {
         "ENGINE": 'django.db.backends.mysql',
        'NAME': 'random_read_test',
        'USER': 'root',
        'PASSWORD': 'yangz'
    }



}