FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build TypeScript to JavaScript
RUN npm run build

EXPOSE 3001

# Run the compiled JavaScript instead of TypeScript
CMD ["node", "dist/index.js"]
