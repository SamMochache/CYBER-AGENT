from rest_framework import generics
from .models import Log
from .serializers import LogSerializer

class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all().order_by('-timestamp')
    serializer_class = LogSerializer
