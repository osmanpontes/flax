import FlaxDispatcher from './FlaxDispatcher';
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

  // Register with dispatcher
  this.dispatchToken = FlaxDispatcher.register(this, function (action) {
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
      var getter = spec.getters[getterName].bind(this); // TODO now getters have access to all properties?
      this.getters[getterName] = getter;
      this[getterName] = getter;
    }
  }

  // TODO
  for (var property in spec) {
    if (spec.hasOwnProperty(property) && typeof spec[property] === 'function') {
      var helper = spec[property].bind(this);
      this[property] = helper;
    }
  }

  // Copy getInitialState function
  this.getInitialState = spec.getInitialState;

  // Set state to initial
  this.state = spec.getInitialState();
};

Store.prototype = new FlaxEmitter();

Store.prototype.getState = function () {
  return this.state;
};

Store.prototype.resetState = function () {
  // this.state = this.getInitialState();
  Object.assign(this.state, this.getInitialState());
};

Store.prototype.waitFor = function (stores) {
  var ids = stores.map(store => store.dispatchToken);
  FlaxDispatcher.waitFor(ids);
};

// TODO implement other dispatcher functionality

export default Store;