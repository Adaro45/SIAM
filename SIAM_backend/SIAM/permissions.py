from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsStaffOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['staff', 'admin']

class IsNormalOrHigher(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['normal', 'staff', 'admin']
