FROM node:20-bullseye-slim

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Set the NODE_ENV to production
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --only=production

# Bundle app source
COPY --chown=node:node . .

# Build the TypeScript files
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Run the app as a non-root user
USER node

# Install dumb-init
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the app
CMD [ "npm", "run", "start" ]

