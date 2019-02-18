# Raspberry Pi Home Backend
This is a react based fronted for [Pi home frontend](https://github.com/sidhantpanda/raspberry-pi-home-frontend). This is a Express generated app.

## Tutorial
https://medium.com/@sidhantpanda/raspberry-pi-home-automation-with-google-assistant-integration-part-1-software-71b3b8904205

## Clone to your Pi
```
git clone git@github.com:sidhantpanda/raspberry-pi-home-backend.git
```

## Install dependencies

```
cd raspberry-pi-home-backend && npm install

```

## Proxy pass on nginx server for CORS
Follow instructions to set up [nginx on raspbian here](https://www.raspberrypi.org/documentation/remote-access/web-server/nginx.md).

Open the default config file
```
sudo vim /etc/nginx/sites-enabled/default
```

Add the following near the `location \` block
```
    location /api/ {
      proxy_pass http://localhost:5000;
    }
    
    location / {
    ...
```

Save the file and start/restart nginx server
```
sudo service nginx restart
```



##
