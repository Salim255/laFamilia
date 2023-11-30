#FROM nginx:alpine

#COPY  /www/ /usr/share/nginx/html/

# Use an official Node runtime as a parent image
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Ionic app for production
RUN npm run build

# Create a new stage with a lighter image
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=builder /usr/src/app/www /usr/share/nginx/html

# Expose port 80 for the nginx server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
