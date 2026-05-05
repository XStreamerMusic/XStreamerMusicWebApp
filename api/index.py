import os
import sys

# point to backend folder
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

# set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'XStreamerMusicWebApp.settings')

# load Django WSGI app
from django.core.wsgi import get_wsgi_application
app = get_wsgi_application()