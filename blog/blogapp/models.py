from django.db import models
from django.utils import timezone

class Post(models.Model):
    # id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    # author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title