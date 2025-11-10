# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; elif [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
# Build for production
RUN npm run build

# Runtime stage: serve with a lightweight server
FROM node:18-alpine
WORKDIR /app
RUN npm i -g serve@14.2.1
COPY --from=build /app/build ./build
EXPOSE 3000
# Use PORT env if provided (default 3000)
ENV PORT=3000
CMD ["sh", "-c", "serve -s build -l ${PORT}"]
