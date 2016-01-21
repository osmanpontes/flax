import Dispatcher from './Dispatcher';
import events from 'events';

var {EventEmitter} = events;

var Store = function (spec) {
  this.iamstore = true;

  this.displayName = spec.displayName;

  this.events = {};
  for (var eventName in spec.events) {
    if (!spec.events.hasOwnProperty(eventName)) {
      continue;
    }
    this.events[eventName] = `${this.displayName}.${eventName}`;
  }

  // TODO what happens when someone extends the Store class? Or: how to?
  this.getState = spec.getState;

  var binds = {};
  spec.getActionBinds().forEach(bind => {
    var action = bind[0],
      handler = bind[1];
    binds[action.actionType] = handler;
  });

  this.dispatchToken = Dispatcher.register(function (action) {
    var {type, payload} = action;

    binds[type](payload);
  });

};

Store.prototype = new EventEmitter();

Store.prototype.listen = function () {

};

Store.prototype.unlisten = function () {

};

export default Store;