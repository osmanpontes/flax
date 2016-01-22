import EventEmitter from 'events';

var checkArguments = function(args) {
  var n = args.length;
  if (n < 2) {
    // TODO change to console.err
    console.log('ERROR: number of arguments should be greater than or equal to 2');
    return false;
  }

  var callback = args[n - 1];
  if (typeof callback != 'function') {
    // TODO change to console.err
    console.log('ERROR: last argument should be a callback function');
    return false;
  }

  return true;
};

var generateEvent = function (args, hasCallback) {
  var evt = '';
  for (var i = 0; i < args.length - (hasCallback ? 2 : 1); i++) {
    evt += args[i].toString() + '/';
  }

  evt += args[args.length - (hasCallback ? 2 : 1)].toString();

  return evt;
};

var getCallback = function(args) {
  return args[args.length - 1];
};

// TODO document the use with unlimited arguments
var FluxitEmitter = function () {};
FluxitEmitter.prototype = EventEmitter.prototype;
FluxitEmitter.prototype.emitChange = function() {
  this.emit(generateEvent(arguments, false));
};
FluxitEmitter.prototype.addChangeListener = function() {
  if (!checkArguments(arguments)) return;
  // TODO there is something wrong here
  // console.log(generateEvent(arguments, false));

  this.on(generateEvent(arguments, true), getCallback(arguments));
};
FluxitEmitter.prototype.removeChangeListener = function() {
  if (!checkArguments(arguments)) return;

  this.removeListener(generateEvent(arguments, true), getCallback(arguments));
};

export default FluxitEmitter;