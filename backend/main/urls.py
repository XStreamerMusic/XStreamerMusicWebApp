from . import views
from django.urls import path
from django.conf import settings

urlpatterns = [
    path('ping-db/', views.ping_db, name='ping-db'),
    path('csrf', views.get_csrf_token, name='csrf'),
    path('join_waitlist', views.join_waitlist, name="join_waitlist"),
]