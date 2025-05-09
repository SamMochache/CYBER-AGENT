from rest_framework import generics
from .models import Log
from .serializers import LogSerializer

# Simple threat detection logic
THREAT_KEYWORDS = {
    "SSH": "High",
    "login failed": "Medium",
    "unauthorized": "High",
    "malware": "High",
    "sql injection": "Critical",
    "port scan": "Medium",
    "unknown": "Low"
}

def detect_threat_level(content):
    for keyword, level in THREAT_KEYWORDS.items():
        if keyword.lower() in content.lower():
            return level
    return "Low"

class LogListCreateView(generics.ListCreateAPIView):
    queryset = Log.objects.all().order_by('-timestamp')
    serializer_class = LogSerializer

    def perform_create(self, serializer):
        content = self.request.data.get('content', '')
        threat_level = detect_threat_level(content)
        prediction = "Threat" if threat_level != "Low" else "Normal"
        serializer.save(prediction=prediction, threat_level=threat_level)
