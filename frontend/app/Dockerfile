FROM alpine:3.7
RUN apk add --update nodejs nodejs-npm
RUN apk --no-cache add git

COPY . /src
WORKDIR /src
RUN npm install
RUN npm build
RUN serve -l 5050 -s build
