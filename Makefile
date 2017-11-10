CC = yarn
NODE_ENV?=development

.PHONY: clean all test

all:
	$(MAKE) clean
	$(MAKE) client
	$(MAKE) server

clean:
	rm -rf dist

test:
	echo "No tests!"

client:
	$(CC) run webpack --config ./config/webpack/webpack.client.js

server:
	$(CC) run webpack --config ./config/webpack/webpack.server.js

docker:
	docker build -t harmonize/harmonize:latest --build-arg NODE_ENV=$(NODE_ENV) .
