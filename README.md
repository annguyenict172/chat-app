# Chat App

### Description

This project aims to replicate basic functionalities of popular instant messaging applications like iMessage, Facebook Messenger, .etc.

In addition, I made it very simple to host this application on your own by using Docker. If you care about data privacy, you can host this app by yourself and use it with your friends :)

### Development Guide

1. Install Docker. See this [link](https://docs.docker.com/docker-for-mac/install/) for installation guide on Mac OS.
2. Set the working directory to this repo `$ cd chat-app`.
3. Create a `.env` file and add the necessary environment variables. See `.env.example` for example.
4. Run the development server and web app by running this command: `$ docker-compose -f dev-docker-compose.yml up --build`
5. The web app and server will be available based on your chosen ports.

### Production Guide

Build the production version by running this command `docker-compose -f docker-compose.yml up --build`.

If you wish to use an external MongoDB server, specify its URI by changing the environment variable `MONGO_URI`. Also remember to remove the `db` service in `docker-compose.yml`.

### Pending Features
- Group chat
- Send images with message