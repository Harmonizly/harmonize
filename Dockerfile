FROM bcwebb88/node-ami:latest

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV:-development}

COPY . /usr/local/src/harmonize
WORKDIR /usr/local/src/harmonize

RUN yarn install
RUN make all

EXPOSE 80
EXPOSE 8080

ENTRYPOINT ["yarn", "start"]
