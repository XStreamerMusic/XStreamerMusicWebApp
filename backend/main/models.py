from django.db import models

# Create your models here.
class Waitlist(models.Model):

    email = models.EmailField(unique=True, max_length=100)

    def __str__(self):
        return self.email