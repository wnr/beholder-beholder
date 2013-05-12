//Used for handling logging.
var logger = require('./lib/log');

//Used to get info about the component.
var info = require('./lib/info');

logger.log('info', 'Starting %s component with ID %d', info.getName(), info.getID());

logger.log('info', 'Terminated %s component with ID %d', info.getName(), info.getID());