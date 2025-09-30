FROM node:22-alpine

WORKDIR /app

# Install Python and bun
RUN apk add --no-cache python3 py3-pip
RUN pip3 install --break-system-packages golem-base-sdk web3
RUN npm install -g bun

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Copy static files and public directory to standalone directory
RUN cp -r .next/static .next/standalone/.next/static
RUN cp -r public .next/standalone/public

# Expose port
EXPOSE 3000

# Start production server using standalone build
CMD ["node", ".next/standalone/server.js"]