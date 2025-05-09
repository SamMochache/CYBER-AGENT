from django.db import models

class Log(models.Model):
    source_ip = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    prediction = models.CharField(max_length=100, blank=True)
    threat_level = models.CharField(max_length=50, default="Low")  # e.g. Low, Medium, High

    def __str__(self):
        return f"{self.source_ip} - {self.threat_level}"
