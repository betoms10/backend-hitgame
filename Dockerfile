FROM node:14-alpine

RUN apk add --update-cache \
    python \
    python-dev \
    py-pip \
    build-base

# Set working directory
WORKDIR /usr/app

RUN mkdir files

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true
RUN apk --no-cache add --virtual builds-deps build-base python

ENV REQUEST_TIMEOUT 30000

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
# RUN npm install --production
RUN npm install

# Copy all files
COPY ./ ./

RUN npm run build

# Expose the listening port
EXPOSE 7003

# Launch app
CMD [ "npm", "run", "start:prod" ]
