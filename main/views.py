from django.shortcuts import render

# Create your views here.
def waitlist(request):

    context = {
        "page_title": "Join the New Wave"
    }

    return render(request, 'waitlist.html', context)