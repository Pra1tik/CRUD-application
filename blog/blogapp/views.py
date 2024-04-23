from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse

from .models import Post
from .serializers import PostSerializer

class View(APIView):
    def post(self, request):
        if request.method == "POST":
            data = request.data
            serializer = PostSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Added successfully", safe=False)
        
            return JsonResponse("Failed to add",safe=False)

    def getPost(self, pID):
        try:
            post = Post.objects.get(pk=pID)
            return post
        except post.DoesNotExist:
            raise Http404

    def get(self, request, pID=None):
        if pID:
            data = self.getPost(pID)
            serializer = PostSerializer(data)
        else:
            data = Post.objects.all()
            serializer = PostSerializer(data, many=True)
        return Response(serializer.data)

    def put(self, request, pID=None):
        postToUpdate = Post.objects.get(pk=pID)
        serializer = PostSerializer(instance=postToUpdate,data=request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to update")

    def delete(self, request, pID):
        postToDelete = Post.objects.get(pk=pID)
        postToDelete.delete()
        return JsonResponse("Deleted Successfully", safe=False)        

