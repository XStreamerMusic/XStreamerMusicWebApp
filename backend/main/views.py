from .models import Waitlist
from .forms import WaitlistForm
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404, JsonResponse
from datetime import datetime

# Create your views here.

def index(request):

    context = {

    }

    return redirect('waitlist')


def waitlist(request):

    context = {
        "page_title": "Join the New Wave"
    }

    return render(request, 'waitlist.html', context)


def join_waitlist(request):

    if request.method == "POST":
        form = WaitlistForm(request.POST)

        if form.is_valid():

            email = form.cleaned_data["email"]

            try:
                new, created = Waitlist.objects.get_or_create(email=email)
                
                if not created:
                    messages.error(request, "This email is already on the waitlist")
                    return redirect('waitlist')
                
                subject = "Waitlist just got longer!"
                message = f"There's a new member on the waitlist:\n\n{email}"
                sender = settings.EMAIL_HOST_USER
                recipients = ["xstreamermusic@gmail.com"]

                send_mail(subject, message, sender, recipients)

                messages.success(request, "You've been added to the waitlist! See you soon!")
            except Exception as e:
                messages.error(request, e)
            finally:
                return redirect('waitlist')

        else:
            messages.error(request, e)
            return redirect('waitlist')


def ping_db(request):
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    email = f"sample{timestamp}@xstreamermusic.xyz"
    
    sample = Waitlist.objects.create(email=email)
    sample.delete()

    return JsonResponse({"status": "pinged", "email": email})