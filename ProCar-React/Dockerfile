# Stage 1: Build the React app using Vite
FROM node:16-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (output goes to /app/dist)
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built app from the previous stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]