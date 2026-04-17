from main.models import Waitlist
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import user_passes_test


@user_passes_test(lambda u: u.is_superuser)
def dashboard(request):

    context = {
        'waitlisters': Waitlist.objects.all(),
        'page_title': "Metric Dashboard"
    }

    return render(request, 'dashboard.html', context)