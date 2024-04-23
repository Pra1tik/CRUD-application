from django.urls import path
from . import views



urlpatterns = [
    path("posts/", views.View.as_view()),
    path("posts/<int:pID>", views.View.as_view()),
    # path("read/", views.read, name="readURL"),
    # path("update/<int:oldPostID>", views.update, name="updateURL"),
    # path("create/<int:postID>", views.delete, name="deleteURL"),
]