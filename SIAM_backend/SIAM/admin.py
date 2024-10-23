from django.contrib import admin
from .models import Investigator, Entity,Measures
from .models import Resources,Project
# Register your models here.
admin.site.register(Investigator)
admin.site.register(Entity)
admin.site.register(Measures)
admin.site.register(Resources)
admin.site.register(Project)

