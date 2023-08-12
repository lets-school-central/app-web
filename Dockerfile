FROM node:20-alpine AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . ./

ARG VERSION
ENV ORIGIN=https://www.lets-school-central.app
ENV PORT=8080
RUN HOST=0.0.0.0 PORT=${PORT} ORIGIN=${ORIGIN} VERSION=${VERSION} pnpm run build

FROM node:20-alpine

RUN mkdir -p /usr/local/bin/app/
COPY --from=build /usr/src/app/package.json /usr/src/app/build/. /usr/local/bin/app/

ENV PORT=8080
EXPOSE ${PORT}

CMD ["node", "/usr/local/bin/app/index.js"]
