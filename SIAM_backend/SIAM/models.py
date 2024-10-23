from django.db import models
# from django.contrib.auth.models import AbstractUser


# class CustomUser(AbstractUser):
#     ROLE_CHOICES = [
#         ('normal','Normal'),
#         ('investigador','Investigator'),
#         ('admin','Admin'),
#     ]
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='normal')
#     def __str__(self):
#         return self.username
class Investigator(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    def __str__(self):
        return self.name
class Entity(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=350, unique=True)
    acron = models.CharField(max_length=50)
    def ___str__(self):
        return self.acron

class Measures(models.Model):
    id = models.BigAutoField(primary_key=True)
    measure = models.FileField(upload_to="measures/")
    def __str__(self):
        return str(self.measure)

class Resources(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=50)
    resource = models.ImageField(blank ='', default="",upload_to='resources/')
    def __str__(self):
        return str(self.resource)

class Project(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100, unique=True)
    acron = models.CharField(max_length=50)
    date = models.DateField(auto_created=True,default='2020-01-01')
    results = models.TextField(blank=False, default='Still no results')
    description = models.TextField(blank=False,default='Missing description')
    inv_area = models.CharField(max_length=100)
    princ_img = models.ImageField(blank ='', default="",upload_to='princ_img/')
# Investigator-relations
    investigators = models.ManyToManyField(Investigator,related_name='investigatorlist')
    project_boss = models.ForeignKey(Investigator, on_delete=models.CASCADE, default="0", related_name='project_boss')
    tecnic_boss = models.ForeignKey(Investigator,on_delete=models.CASCADE, default="0",related_name='tecnic_boss')
# Entity-Relation
    leed_entity = models.ForeignKey(Entity, on_delete=models.CASCADE, default='0', related_name='leed_entity')
    financed = models.ForeignKey(Entity, on_delete=models.CASCADE, default='0',  related_name='financed')
    entitys = models.ManyToManyField(Entity, related_name= 'entitys')
    clients = models.ManyToManyField(Entity, related_name='clients')
# Extra-relations
    resource = models.ManyToManyField(Resources,related_name='resources')
    measures = models.OneToOneField(Measures, on_delete=models.SET_NULL,null=True, blank=True,related_name='measures')
    def __str__(self):
        return self.title