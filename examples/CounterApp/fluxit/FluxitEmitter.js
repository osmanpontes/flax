import EventEmitter from 'events';

var FluxitEmitter = function () {};
FluxitEmitter.prototype = new EventEmitter();
FluxitEmitter.prototype.emitChange = function(event) {
  this.emit(event.toString());
};
FluxitEmitter.prototype.addChangeListener = function(event, handler) {
  this.on(event.toString(), handler);
};
FluxitEmitter.prototype.removeChangeListener = function(event, handler) {
  this.removeListener(event.toString(), handler);
};

export default FluxitEmitter;