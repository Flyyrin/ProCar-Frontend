# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install 'serve' globally to serve the production build
RUN npm install -g serve

# Expose port 3000 for the app
EXPOSE 3000

# Start the application using 'serve'
CMD ["serve", "-s", "dist", "-l", "3000"]
