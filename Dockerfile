# Multi-service repo: Dockerfile is for backend only
FROM node:20

WORKDIR /app
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

ENV NODE_ENV=production
EXPOSE 5000

CMD ["npm", "start"]