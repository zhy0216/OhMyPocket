from django.db import models
from django.contrib.auth.models import User
from userena.models import UserenaBaseProfile

class UserProfile(UserenaBaseProfile):
    user = models.OneToOneField(User,
                                unique=True,
                                related_name='user_profile')
