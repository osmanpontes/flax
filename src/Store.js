import FlaxDispatcher from './FlaxDispatcher';
import FlaxEmitter from './FlaxEmitter';
import StoreEvent from './StoreEvent';

let _count = 0;

const Store = function (spec) {
  this.displayName = spec.displayName;

  // Get events
  this.events = {};
  for (let eventName in Object.assign({DEFAULT: null}, spec.events)) {
    let event = new StoreEvent(_count++, eventName, this);
    this.events[eventName] = event;
    this[eventName] = event;
    spec.events[eventName] = event;
    spec[eventName] = event;
  }

  // Get binds
  let binds = {};
  spec.getActionBinds().forEach(bind => {
    let action = bind[0];
    let defaultEvent = bind[2];
    let handler = function (payload) {
      bind[1].call(this, payload);
      if (typeof defaultEvent !== 'undefined') this.emitChange(defaultEvent);
      this.emitChange(this.DEFAULT);
    };

    binds[action.actionType] = handler;
  });

  // Register with dispatcher
  this.dispatchToken = FlaxDispatcher.register(function (action) {
    let {type, payload} = action;

    if (typeof binds[type] !== 'undefined') binds[type].call(this, payload);
  }.bind(this), this);

  // Copy getters
  this.getters = {};
  for (let getterName in spec.getters) {
    if (spec.getters.hasOwnProperty(getterName)) {
      let getter = spec.getters[getterName].bind(this); // TODO now getters have access to all properties?
      this.getters[getterName] = getter;
      this[getterName] = getter;
    }
  }

  // TODO
  for (let property in spec) {
    if (spec.hasOwnProperty(property) && typeof spec[property] === 'function') {
      let helper = spec[property].bind(this);
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
  let ids = stores.map(store => store.dispatchToken);
  FlaxDispatcher.waitFor(ids);
};

// TODO implement other dispatcher functionality

export default Store;