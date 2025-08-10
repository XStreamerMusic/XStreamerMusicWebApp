from main.models import Waitlist
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required


@staff_member_required
def dashboard(request):

    context = {
        'waitlisters': Waitlist.objects.all(),
        'page_title': "Metric Dashboard"
    }

    return render(request, 'dashboard.html', context)