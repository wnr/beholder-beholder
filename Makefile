#The reporter to be used by mocha. Use the "spec" reporter.
REPORTER = spec

#To be runned when invoking "make test". Run mocha test of all tests in test/ directory.
#This assumes mocha to be installed in local node_modules.
test: 
	./node_modules/.bin/mocha --reporter $(REPORTER)

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) --growl --watch

#Not having any target, so use phony for better performance.
.PHONY: test test-w