import uuid
import secrets
from django.db import models
from datetime import timedelta
from django.urls import reverse
from django.conf import settings
from django.utils import timezone
from django.core.signing import TimestampSigner

# Create your models here.

giveaway_status = [ ('open', 'Open'),
                    ('closed', 'Closed'),
                    ('waiting', 'Waiting'),
                    ]

class Giveaway(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    public_id = models.CharField(max_length=12, unique=True, editable=False)  # new field

    title = models.CharField(max_length=255)
    prize = models.CharField(max_length=255)
    description = models.TextField()
    product_value = models.DecimalField(max_digits=10, decimal_places=2)
    miscellaneous_cost = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    
    status = models.CharField(max_length=20, choices=giveaway_status)

    def mark_closed(self):
        self.status = 'closed'
        self.save()

    def save(self, *args, **kwargs):
        if not self.public_id:
            # generate a short, unique identifier
            self.public_id = self._generate_unique_public_id()
        super().save(*args, **kwargs)

    def _generate_unique_public_id(self, length=8):
        """Generate a unique, URL-safe public ID"""
        while True:
            pid = secrets.token_urlsafe(length)
            if not Giveaway.objects.filter(public_id=pid).exists():
                return pid

    def get_absolute_url(self):
        return reverse("giveaway-detail", args=[self.public_id])
    
    def __str__(self):
        return self.title


class GiveawayWinner(models.Model):
    giveaway = models.ForeignKey(Giveaway, on_delete=models.CASCADE, related_name="winners")
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=100)
    x_username = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.giveaway.prize})"


class ClaimToken(models.Model):
    giveaway = models.ForeignKey(Giveaway, on_delete=models.CASCADE, related_name="claim_tokens")

    token = models.CharField(max_length=255, unique=True)
    token_expires_at = models.DateTimeField(blank=True, null=True)
    claimed_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate(self, lifetime_hours=48):
        signer = TimestampSigner()
        self.token = signer.sign(str(uuid.uuid4()))
        self.token_expires_at = timezone.now() + timedelta(hours=lifetime_hours)
        self.claimed_at = None
        self.save()
        return self.token

    def mark_claimed(self):
        self.claimed_at = timezone.now()
        self.save()

    def get_claim_url(self, request=None):
        """
        Return a full URL for the landing page where the user fills in their info.
        """
        # Landing page URL, not claim URL
        relative_url = reverse("giveaway-landing", args=[self.giveaway.public_id, self.token])

        if request:
            return request.build_absolute_uri(relative_url)

        domain = getattr(settings, "SITE_URL", "http://localhost:8000")
        return f"{domain}{relative_url}"

    
    @property
    def is_claimed(self):
        return self.claimed_at is not None

    @property
    def is_valid(self):
        from django.utils import timezone
        return self.token and not self.is_claimed and self.token_expires_at and timezone.now() <= self.token_expires_at

    def __str__(self):
        return f"Token for giveaway {self.giveaway.prize}"