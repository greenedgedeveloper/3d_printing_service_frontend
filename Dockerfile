# Build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci
#COPY yarn.lock ./
#RUN yarn install --frozen-lockfile

COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]