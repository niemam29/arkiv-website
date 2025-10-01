FROM python:3.12-alpine

WORKDIR /app

# Install Node.js and npm for JavaScript execution
RUN apk add --no-cache nodejs npm

# Create JavaScript workspace and install common libraries
RUN mkdir -p /app/js_workspace && \
    cd /app/js_workspace && \
    npm init -y && \
    npm install ethers@6 web3@4 axios golem-base-sdk dotenv

# Install Python dependencies
COPY execution-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY execution-service/main.py .

# Set NODE_PATH for global module access
ENV NODE_PATH=/app/js_workspace/node_modules

# Expose port
EXPOSE 8001

# Run the application
CMD ["python", "main.py"]
