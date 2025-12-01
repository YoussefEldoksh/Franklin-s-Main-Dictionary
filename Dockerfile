FROM node:18-alpine

WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

