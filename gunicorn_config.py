#Deployment commands： gunicorn chatGPT_Web:app -c gunicorn_config.py

bind = 'ip:5000'    # your IP:PORT
worker_class = 'gevent'  
worker_connections = 1000
workers = 3  # Number of worker processes
timeout = 60 
loglevel = 'debug'