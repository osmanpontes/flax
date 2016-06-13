import {Dispatcher} from 'flux';
import EventEmitter from 'events';

import Environment from './environment';

let FlaxDispatcher = Dispatcher;

if (!Environment.isProduction) {
  const _dispatcher = new Dispatcher();

  let _registeredStores = [];
  let _actionHistory = [];
  let _active = true;

  FlaxDispatcher = function () {};

  FlaxDispatcher.DISPATCH = "DISPATCH";

  FlaxDispatcher.prototype = new EventEmitter();

  FlaxDispatcher.prototype.register = function (callback, store) {
    _registeredStores.push(store);

    return _dispatcher.register(callback);
  };

  FlaxDispatcher.prototype.unregister = function (id) {
    _dispatcher.unregister(id);
  };

  FlaxDispatcher.prototype.waitFor = function (ids) {
    _dispatcher.waitFor(ids);
  };

  FlaxDispatcher.prototype.dispatch = function (payload) {
    if (!_active) return;

    _actionHistory.push(payload);

    _dispatcher.dispatch(payload);

    this.emit(this.DISPATCH);
  };

  FlaxDispatcher.prototype.isDispatching = function () {
    return _dispatcher.isDispatching();
  };

  FlaxDispatcher.prototype.getActionHistory = function () {
    return _actionHistory;
  };

  FlaxDispatcher.prototype.resetAllStores = function () {
    _registeredStores.forEach((store) => {
      store.resetState();
    });
  };

  FlaxDispatcher.prototype.playActions = function(payloads, index) {
    this.resetAllStores();

    if (typeof index !== 'undefined') { 
      for (let i = 0; i <= index; i++) {
        _dispatcher.dispatch(payloads[i]);
      }
      return;
    }

    payloads.forEach((payload) => {
      _dispatcher.dispatch(payload);
    });
  };

  FlaxDispatcher.prototype.playActionsUntilIndex = function(index) {
    this.playActions(_actionHistory, index);
  };

  FlaxDispatcher.prototype.rollback = function() {
    this.resetAllStores();

    this.playActions(_actionHistory);
  };

  FlaxDispatcher.prototype.getRegisteredStores = function () {
    return _registeredStores;
  };

  FlaxDispatcher.prototype.getActionHistory = function () {
    return _actionHistory;
  };

  FlaxDispatcher.prototype.setActionHistory = function (actionHistory) {
    _actionHistory = actionHistory;

    this.playActions(_actionHistory);
  };

  FlaxDispatcher.prototype.setActive = function (active) {
    _active = active;
  };

  FlaxDispatcher.prototype.isActive = function () {
    return _active;
  };

  FlaxDispatcher.prototype.toggleActive = function () {
    _active = !_active;
  };
}

export default new FlaxDispatcher();