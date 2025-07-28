from django.db import models

# Create your models here.
class Waitlist(models.Model):

    email = models.EmailField(max_length=100)