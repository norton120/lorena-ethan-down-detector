# Use nginx alpine for lightweight static file serving
FROM nginx:alpine

# Copy static files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY status-config.yaml /usr/share/nginx/html/
COPY l_e_banner.png /usr/share/nginx/html/
COPY favicon.svg /usr/share/nginx/html/

# Copy custom nginx configuration to serve YAML files correctly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
