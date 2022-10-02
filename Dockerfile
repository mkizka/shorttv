########################
#         DEPS         #
########################

FROM node:16-alpine AS deps
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat openssl
COPY prisma ./prisma
COPY package.json pnpm-lock.yaml ./
RUN yarn global add pnpm && pnpm i

########################
#        BUILDER       #
########################

FROM node:16-alpine AS builder
# https://caprover.com/docs/app-configuration.html#environment-variables
ARG TWITCH_CLIENT_ID
ENV TWITCH_CLIENT_ID=${TWITCH_CLIENT_ID}
ARG TWITCH_TOKEN
ENV TWITCH_TOKEN=${TWITCH_TOKEN}
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn global add pnpm &&\
  pnpm prisma migrate deploy &&\
  pnpm fetchStreams &&\
  pnpm fetchClips &&\
  pnpm build

########################
#        RUNNER        #
########################

FROM node:16-alpine AS runner
ENV NODE_ENV production
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs &&\
  adduser --system --uid 1001 nextjs
# BUILDERで作ったDBは/app/prisma以下にあるべき
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
