from django.contrib import admin
from django.utils.html import format_html
from .models import Giveaway, GiveawayWinner, ClaimToken

# Inline winner display under a giveaway
class GiveawayWinnerInline(admin.TabularInline):
    model = GiveawayWinner
    extra = 0  # don't show extra empty forms

# Inline tokens under a giveaway
class ClaimTokenInline(admin.TabularInline):
    model = ClaimToken
    readonly_fields = ("token", "token_expires_at", "claimed_at")
    fields = ("token", "token_expires_at", "claimed_at")
    extra = 0

@admin.register(Giveaway)
class GiveawayAdmin(admin.ModelAdmin):
    list_display = ("title", "prize", "status", "start_date", "end_date", "generate_link_button")
    inlines = [GiveawayWinnerInline, ClaimTokenInline]
    readonly_fields = ("public_id", "created_at")
    search_fields = ("title", "prize")

    def generate_link_button(self, obj):
        # Creates a button for the first token
        if obj.claim_tokens.exists():
            token = obj.claim_tokens.first()
        else:
            token = ClaimToken.objects.create(giveaway=obj)
            token.generate()

        url = token.get_claim_url()
        return format_html('<a href="{}" target="_blank">Open Landing Page</a>', url)

    generate_link_button.short_description = "Landing Link"

@admin.register(GiveawayWinner)
class GiveawayWinnerAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "x_username", "giveaway")
    search_fields = ("first_name", "last_name", "email", "x_username", "giveaway__title")

@admin.register(ClaimToken)
class ClaimTokenAdmin(admin.ModelAdmin):
    list_display = ("token", "giveaway", "is_claimed", "token_expires_at")
    readonly_fields = ("token", "claimed_at")
    actions = ["generate_new_token"]

    def generate_new_token(self, request, queryset):
        for token in queryset:
            token.generate()
        self.message_user(request, "Selected tokens have been regenerated.")
    generate_new_token.short_description = "Generate new token(s)"