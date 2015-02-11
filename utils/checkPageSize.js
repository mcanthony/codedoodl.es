#!/usr/bin/env node

var phantomas   = require('phantomas');
var resolve     = require('path').resolve;
var connect     = require('connect');
var serveStatic = require('serve-static');
var pretty      = require('prettysize');
var config      = require('../config');

var PORT = 3000;

var path = resolve(process.argv[2] || '.');

var server = connect();

function checkResults(requestCount, pageSize) {

	if (requestCount <= config.MAX_REQUEST_COUNT) {
		console.log('\033[32mRequest count is within limit ('+requestCount+' / '+config.MAX_REQUEST_COUNT+')\033[0m')
	} else {
		console.log('\033[31mRequest count is outside of limit ('+requestCount+' / '+config.MAX_REQUEST_COUNT+')\033[0m');
	}

	if (pageSize <= config.MAX_PAGE_SIZE) {
		console.log('\033[32mPage size is within limit ('+pretty(pageSize)+' / '+pretty(config.MAX_PAGE_SIZE)+')\033[0m')
	} else {
		console.log('\033[31mPage size is outside of limit ('+pretty(pageSize)+' / '+pretty(config.MAX_PAGE_SIZE)+')\033[0m');
	}

}

server.use(serveStatic(path));

server.listen(PORT, function () {

	console.log('\033[90mServing \033[36m%s\033[90m on port \033[96m%d\033[0m', path, PORT);

	phantomas('http://localhost:'+PORT, function(err, json, results) {

		checkResults(results.getMetric('requests'), results.getMetric('bodySize'));
		process.exit();

	});

});