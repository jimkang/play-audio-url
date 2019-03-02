BROWSERIFY = ./node_modules/.bin/browserify
UGLIFY = ./node_modules/uglify-es/bin/uglifyjs
TRANSFORM_SWITCH = -t [ babelify --presets [ es2015 ] ]

test:
	node tests/basictests.js

prettier:
	prettier --single-quote --write "**/*.js"

pushall:
	git push origin master && npm publish

run:
	wzrd demo-app.js:demo.js --https -- \
		-d \
		$(TRANSFORM_SWITCH)

build:
	$(BROWSERIFY) $(TRANSFORM_SWITCH) demo-app.js | $(UGLIFY) -c -m -o demo.js

