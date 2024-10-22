# Use a Node.js image for development
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port the development server runs on (default: 3000)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
