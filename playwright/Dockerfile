FROM node:24-bookworm AS node

FROM mcr.microsoft.com/playwright:v1.45.3-jammy
COPY --from=node /usr/local/ /usr/local/
