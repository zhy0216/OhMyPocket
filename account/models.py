from django.db import models
from django.contrib.auth.models import User

class UserProfile():
    user = models.OneToOneField(User,
                                unique=True,
                                related_name='user_profile')
