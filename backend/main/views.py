from .models import Waitlist
from .forms import WaitlistForm
from django.conf import settings
from django.core.mail import send_mail
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

# Create your views here.

@csrf_exempt
def get_csrf_token(request):
    token = get_token(request)  # forces Django to set the csrftoken cookie
    return JsonResponse({'csrfToken': token})


def join_waitlist(request):

    success = True
    if request.method == "POST":
        form = WaitlistForm(request.POST)

        if form.is_valid():

            email = form.cleaned_data["email"]

            try:
                new, created = Waitlist.objects.get_or_create(email=email)
                
                if not created:
                    message = "This email is already on the waitlist"
                    success = False
                
                else:
                    
                    send_mail(
                    subject = "Waitlist just got longer!",
                    message = f"There's a new member on the waitlist:\n\n{email}",
                    from_email = settings.DEFAULT_FROM_EMAIL,
                    recipient_list = ["xstreamermusic@gmail.com"])

                    message = "You've been added to the waitlist! See you soon!"
            except Exception as e:
                message = e
                success = False
            # finally:
            #     return redirect('waitlist')

        else:
            message = form.errors
            success = False
    
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    return JsonResponse({
        "success": success,
        "message": str(message)
    })


def ping_db(request):
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    email = f"sample{timestamp}@xstreamermusic.xyz"
    
    sample = Waitlist.objects.create(email=email)
    sample.delete()

    return JsonResponse({"status": "pinged", "email": email})