FROM node:latest
RUN mkdir -p /var/www/app
COPY project /var/www/app
RUN cd /var/www/app
WORKDIR /var/www/app
RUN npm -v
RUN npm install
EXPOSE 1337
CMD ["npm","start"]