from .models import *
from django.contrib import admin

admin.site.site_header = "XStreamer Music"

# Register your models here.
admin.site.register(Waitlist)