from django import forms

class GiveawayForm(forms.Form):
    first_name = forms.CharField(required=True, max_length=255)
    last_name = forms.CharField(required=True, max_length=255)
    email = forms.EmailField(required=True, label="Email Address")
    x_username = forms.CharField(required=True, label="Your X (Twitter) Username")