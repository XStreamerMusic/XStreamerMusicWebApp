from django import forms

class WaitlistForm(forms.Form):

    email = forms.EmailField(label="Email Address")