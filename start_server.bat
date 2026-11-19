@echo off
echo ========================================================
echo Starting DV03_T25 Local Web Server
echo Serving at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo ========================================================
start http://localhost:8080
python -m http.server 8080
