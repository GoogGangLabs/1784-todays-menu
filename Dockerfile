FROM node:18.17-alpine3.17

LABEL MAINTAINER="seongsu@goodganglabs.com"

ENV TZ=Asia/Seoul

WORKDIR /usr/local/app

RUN apk update && \
    apk add --no-cache bash tzdata && \
    ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY entrypoint.sh wait-for-it.sh /
RUN chmod +x /entrypoint.sh && \
    chmod +x /wait-for-it.sh

COPY package.json yarn.lock .
RUN yarn

COPY . .
RUN yarn build

CMD ["/entrypoint.sh"]