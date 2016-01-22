import Dispatcher from './Dispatcher';
import FluxitEmitter from './FluxitEmitter';

var _count = 0;

var StoreEvent = function (id, name, store) {
  this.id = id;
  this.name = name;
  this.store = store;
};

StoreEvent.prototype.toString = function () {
  return this.id.toString();
};

StoreEvent.prototype.append = function () {
  return new StoreEvent(`${this.id}/${Array.from(arguments).join('/')}`, this.name, this.store);
};

var Store = function (spec) {
  this.displayName = spec.displayName;

  this.events = {};
  for (var eventName in spec.events) {
    if (!spec.events.hasOwnProperty(eventName)) {
      continue;
    }
    var event = new StoreEvent(_count++, eventName, this);

    this.events[eventName] = event;
    this[eventName] = event;
  }

  // TODO what happens when someone extends the Store class? Or: how to?
  this.getState = spec.getState;

  var binds = {};
  spec.getActionBinds().forEach(bind => {
    var action = bind[0];
    var handler = bind[1];
    binds[action.actionType] = handler;
  });

  var self = this;

  this.dispatchToken = Dispatcher.register(function (action) {
    var {type, payload} = action;

    if (typeof binds[type] !== 'undefined') binds[type].call(self, payload);
  });
};

Store.prototype = new FluxitEmitter();

Store.prototype.waitFor = function (stores) {
  var ids = stores.map(store => store.dispatchToken);
  Dispatcher.waitFor(ids);
};

// TODO implement other dispatcher functionality

export default Store;