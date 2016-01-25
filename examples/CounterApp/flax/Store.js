import Dispatcher from './Dispatcher';
import FlaxEmitter from './FlaxEmitter';
import StoreEvent from './StoreEvent';

var _count = 0;

var Store = function (spec) {
  this.displayName = spec.displayName;

  // Get binds
  var binds = {};
  spec.getActionBinds().forEach(bind => {
    var action = bind[0];
    var handler = bind[1];
    binds[action.actionType] = handler;
  });

  // var self = this;

  // Register with dispatcher
  this.dispatchToken = Dispatcher.register(function (action) {
    var {type, payload} = action;

    if (typeof binds[type] !== 'undefined') binds[type].call(this, payload);
  }.bind(this));

  this.events = {};
  for (var eventName in spec.events) {
    if (!spec.events.hasOwnProperty(eventName)) {
      continue;
    }
    var event = new StoreEvent(_count++, eventName, this);

    this.events[eventName] = event;
    this[eventName] = event;
  }

  // Copy getters
  this.getters = {};
  for (var getterName in spec.getters) {
    if (spec.getters.hasOwnProperty(getterName)) {
      var getter = spec.getters[getterName];
      this.getters[getterName] = getter;
      this[getterName] = getter;
    }
  }

  // Copy getState
  this.getState = spec.getState;
};

Store.prototype = new FlaxEmitter();

Store.prototype.waitFor = function (stores) {
  var ids = stores.map(store => store.dispatchToken);
  Dispatcher.waitFor(ids);
};

// TODO implement other dispatcher functionality

export default Store;