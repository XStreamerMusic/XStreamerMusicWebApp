from django.db import IntegrityError
from .models import Waitlist
from .forms import WaitlistForm
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.http import HttpResponse

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