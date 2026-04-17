from . import views
from django.urls import path
from django.conf import settings

urlpatterns = [
    path('', views.index, name="index"),
    path('ping-db/', views.ping_db, name='ping-db'),
    path('waitlist', views.waitlist, name="waitlist"),
    path('join_waitlist', views.join_waitlist, name="join_waitlist"),
]