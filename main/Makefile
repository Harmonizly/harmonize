
.PHONY: all clean test

all:
	$(MAKE) client
	$(MAKE) server

clean:
	rm -rf dist

test:
	echo "No tests!"

client:
	yarn run webpack --config ./config/webpack/webpack.client.js

server:
	yarn run webpack --config ./config/webpack/webpack.server.js
