from django.contrib import admin
from .models import Investigator, Entity, Measures
from .models import Resources, Project, CustomUser
from .forms import CustomUserCreationForm , CustomUserChangeForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.
admin.site.register(Investigator)
admin.site.register(Entity)
admin.site.register(Measures)
admin.site.register(Resources)
admin.site.register(Project)

@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser

    # Personalizar fieldsets para evitar conflictos con 'usable_password'
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'role')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    # Excluir cualquier campo problemático
    exclude = ('usable_password',)
