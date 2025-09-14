from django.http import Http404
from .forms import GiveawayForm
from django.shortcuts import render
from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.http import HttpResponseForbidden
from .models import Giveaway, GiveawayWinner, ClaimToken
from django.shortcuts import render, redirect, get_object_or_404

# Create your views here.
def giveaway_landing(request, public_id, token):
    """
    Serve the landing page with the claim form.
    """
    try:
        claim_token = ClaimToken.objects.get(token=token, giveaway__public_id=public_id)
    except ClaimToken.DoesNotExist:
        raise Http404("Giveaway not found or invalid link.")

    if not claim_token.is_valid:
        raise Http404("This link is invalid, expired, or already used.")

    giveaway = claim_token.giveaway
    form = GiveawayForm()  # empty form for display

    context = {
        "form": form,
        "giveaway": giveaway,
        'page_title': "Claim Your Prize",
        "token": token,  # needed for POST
    }

    return render(request, "landing.html", context)


def claim_giveaway(request, public_id, token):
    """
    Handle POST submission from the claim form.
    """
    if request.method != "POST":
        raise Http404("Invalid request method.")

    try:
        claim_token = ClaimToken.objects.get(token=token, giveaway__public_id=public_id)
    except ClaimToken.DoesNotExist:
        raise Http404("Invalid token or giveaway.")

    if not claim_token.is_valid:
        messages.error(request, "This link is invalid, expired, or already used.")
        return redirect("giveaway-landing", public_id=public_id, token=token)

    form = GiveawayForm(request.POST)
    if form.is_valid():
        # create winner

        giveaway=claim_token.giveaway
        first_name=form.cleaned_data["first_name"]
        last_name=form.cleaned_data["last_name"]
        email=form.cleaned_data["email"]
        x_username=form.cleaned_data["x_username"]

        GiveawayWinner.objects.create(
            giveaway=giveaway,
            first_name=first_name,
            last_name=last_name,
            email=email,
            x_username=x_username,
        )
        claim_token.mark_claimed()
        giveaway.mark_closed()

        subject = f"{first_name} {last_name}, {x_username}, just claimed their prize!"
        message = f"giveaway:{giveaway.title}\nPrize:{giveaway.prize}\nClaimant: {first_name} {last_name}\nemail: {email}\nX username: {x_username}"
        sender = settings.EMAIL_HOST_USER
        recipients = ["xstreamermusic@gmail.com"]

        send_mail(subject, message, sender, recipients)
        
        return redirect("giveaway-success", public_id=public_id)

    # If form is invalid, re-render the landing page with errors
    giveaway = claim_token.giveaway
    
    for field, errors in form.errors.items():
        for error in errors:
            messages.error(request, f"{field}: {error}")
    
    return redirect("giveaway-landing", public_id=public_id, token=token)


def giveaway_success(request, public_id):

    # messages.success(request, "Your prize claim was successful! Watch your e-mails for more details on your prize")

    context = { 
        'page_title': 'All Done!'
    }

    return render(request, 'success.html', context)