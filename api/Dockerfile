# api/Dockerfile
FROM oven/bun:latest AS base
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
RUN bun install

# Copy source code
COPY . .

# Development stage
FROM base AS development
EXPOSE 3001
CMD ["bun", "run", "dev"]

# Production stage
FROM base AS production
RUN bun run build
EXPOSE 3001
CMD ["bun", "run", "start"]

# Migration stage
FROM base AS migration
CMD ["bun", "run", "migrate"]