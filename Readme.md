# 🚀 The Ultimate Nginx Guide & Cheat Sheet

Welcome to the complete guide on **Nginx**! This document covers everything you need to know: what it is, why we use it, how to install it, and the most common configurations (Reverse Proxy, Load Balancing, and Static Server).

---

## 🤔 What is Nginx?
Nginx (pronounced *"engine-ex"*) is a highly popular, open-source software used for web serving, reverse proxying, caching, load balancing, and media streaming. 



### Nginx acts as:
1. **A Web Server:** Directly serving static files (HTML, CSS, JS, Images) to the user.
2. **A Reverse Proxy:** Sitting in front of backend servers (like Node.js, Python, or Go) to pass requests to them securely.
3. **A Load Balancer:** Distributing incoming traffic across multiple backend servers to ensure no single server gets overwhelmed.

---

## 💻 Installation

### For macOS (using Homebrew):
```bash
brew install nginx


Action,macOS (Homebrew),Ubuntu / Linux
Test Syntax,nginx -t,sudo nginx -t
Start Nginx,brew services start nginx,sudo systemctl start nginx
Stop Nginx,brew services stop nginx,sudo systemctl stop nginx
Restart Nginx,brew services restart nginx,sudo systemctl restart nginx
Reload Config,nginx -s reload,sudo systemctl reload nginx


moving to this director servers/ or sites-available/

and create an file like proejct_nama.conf

then write code confoguration 
server {
    listen 80;
    server_name yourdomain.com [www.yourdomain.com](https://www.yourdomain.com); # Or localhost

    location / {
        proxy_pass http://localhost:3000; # Forwarding to Node.js
        
        # Standard headers to pass client details to the backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

if you wanted to add ngnix behave as load balancer 

# Define the pool of backend servers
upstream backend_cluster {
    server 127.0.0.1:3000; # Instance 1
    server 127.0.0.1:3001; # Instance 2
    server 127.0.0.1:3002; # Instance 3
}

server {
    listen 80;
    server_name yourdomain.com;

    location / {
      
        proxy_pass http://backend_cluster;
        proxy_set_header Host $host;
    }
}