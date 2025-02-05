# README

# Web URL Scraper

## Overview
This is a **Web URLs Scraper** app. The application allows users to scrape web pages for content and extract useful links.

## Ruby Version
- Ruby Version: 3.4.1

## System Dependencies
- Rails 8.0.1
- Vue.js 3.3
- Tailwindcss 3
- Docker


## Prerequisites
Ensure you have the following installed on your system:
- [Docker](https://docs.docker.com/get-docker/)
  
## Project Setup

### 1. Clone the Repository
```bash
git clone git@github.com:hassam-zahid/url-scraper.git
cd url-scraper
```

### 2. Build the Docker Image
```bash
docker build -t scraper .
```
This will build the necessary services defined in Dockerfile.

### 3. Start the Containers
```bash
docker run -p 3000:3000 -v $(pwd):/rails -e RAILS_ENV=development scraper
```
This will start the Rails application.

## Running Database Migrations
If your application requires database migrations, run the following command:
```bash
docker run -v $(pwd):/rails -e RAILS_ENV=development scraper ./bin/rails db:migrate
```
This ensures that the database schema is updated.

## Asset Compilation (if needed)
If you're using Propshaft or Tailwind, make sure assets are compiled:
```bash
docker run -v $(pwd):/rails -e RAILS_ENV=development scraper ./bin/rails assets:precompile
```

## Running the Rails Console
You can access the Rails console inside the container with:
```bash
docker run -it -v $(pwd):/rails -e RAILS_ENV=development scraper ./bin/rails console
```

## Accessing the Application
Once the container is running, open your browser and go to:
```
http://localhost:3000
```

## Stopping the Containers
To stop and remove running containers:
```bash
docker stop <container-id>
```

## Secrets Handling in Rails
Rails introduced encrypted credentials to securely store sensitive data like API keys, database passwords, and third-party service credentials.
Rails uses `config/master.key` and `config/credentials.yml.enc` to manage secrets.
The `config/master.key` holds the key/token which is used to encrypt and decrypt the credentials.
The `config/credentials.yml.enc` holds the credentials in the encrypted yml format.
### How to use Secrets
We use this command to view or edit the credentials:
```bash
EDITOR=nano rails credentials:edit
```
And we use below code to use the credentials anywhere in our app 
```bash
Rails.application.credentials.dig(:aws, :access_key_id)
```
or
```bash
Rails.application.credentials[:secret_key_base]
```
Rails also facilitates to manages credentails for different environment. We can manage credentials for environments with below commands
```bash
EDITOR=nano rails credentials:edit --environment development
EDITOR=nano rails credentials:edit --environment production
```

## Troubleshooting
### Missing Asset Error (`Propshaft::MissingAssetError`)
If you see an error like `The asset 'tailwind.css' was not found in the load path`, ensure that assets are compiled:
```bash
docker run -v $(pwd):/rails -e RAILS_ENV=development scraper ./bin/rails assets:precompile
```

## Rebuilding the Container (if changes are made)
If you make changes to the Dockerfile or dependencies, rebuild the container:
```bash
docker build -t <image-name> .
```
---



