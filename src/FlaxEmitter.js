import EventEmitter from 'events';

const FlaxEmitter = function () {};
FlaxEmitter.prototype = new EventEmitter();
FlaxEmitter.prototype.emitChange = function(event) {
  this.emit(event.toString());

  if (event !== event.store.events.DEFAULT) {
    this.emit(event.store.events.ANY.append(event.tags).toString());
  }
};
FlaxEmitter.prototype.addChangeListener = function(event, handler) {
  this.on(event.toString(), handler);
};
FlaxEmitter.prototype.removeChangeListener = function(event, handler) {
  this.removeListener(event.toString(), handler);
};

export default FlaxEmitter;