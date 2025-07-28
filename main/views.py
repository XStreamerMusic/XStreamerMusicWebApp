from .forms import WaitlistForm
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.http import HttpResponse

# Create your views here.
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

            subject = "Waitlist just got longer!"
            message = f"There's a new member on the waitlist:\n\n{email}"
            sender = settings.EMAIL_HOST_USER
            recipients = ["xstreamermusic@gmail.com"]

            send_mail(subject, message, sender, recipients)

            return redirect('waitlist')
        else:
            return HttpResponse("The form was not valid")