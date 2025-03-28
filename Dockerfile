# Use a specific Node.js version
FROM node:18.19-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV MONGODB_URI="mongodb://placeholder-url/1000headlines"

# Build the application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "start"] 