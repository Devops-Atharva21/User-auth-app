# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install all dependencies (including devDependencies required for building)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the React frontend and bundle the Express server
RUN npm run build

# Stage 2: Setup the production environment
FROM node:20-alpine

WORKDIR /app

# Copy package.json for installing production dependencies
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy the built artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
