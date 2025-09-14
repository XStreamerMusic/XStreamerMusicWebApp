from . import views
from django.urls import path

urlpatterns = [
    path(
        "<str:public_id>/landing/<str:token>/",
        views.giveaway_landing,
        name="giveaway-landing",
    ),
    path(
        "<str:public_id>/claim/<str:token>/",
        views.claim_giveaway,
        name="giveaway-claim",
    ),
    path(
        "<str:public_id>/success/",
        views.giveaway_success,
        name="giveaway-success",
    ),
]