"""
WSGI config for XStreamerMusicWebApp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application
from django.core.management import call_command
import django

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'XStreamerMusicWebApp.settings')


try:
    call_command('createadmin')
except:
    pass  # Ignore errors if already exists

# Vercel needs this

application = get_wsgi_application()
app = application
