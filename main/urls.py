from . import views
from django.urls import path
from django.conf import settings

urlpatterns = [
    path('', views.waitlist, name="index"),
    path('waitlist', views.waitlist, name="waitlist"),
]