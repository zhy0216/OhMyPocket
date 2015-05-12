from django.contrib import admin

# Register your models here.
from .models import (Article, UserPostArticle, UserReadArticle, 
                    UserStarArticle, UserArchiveArticle, UserRemoveArticle)

klass_list = (Article, UserPostArticle, UserReadArticle, 
                    UserStarArticle, UserArchiveArticle, UserRemoveArticle)
for klass in klass_list:
    admin.site.register(klass)