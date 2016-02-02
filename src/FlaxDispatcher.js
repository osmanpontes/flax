import {Dispatcher} from 'flux';
import EventEmitter from 'events';

const _dispatcher = new Dispatcher();

const _registeredStores = [];
const _actionHistory = [];

const FlaxDispatcher = function () {
};

FlaxDispatcher.DISPATCH = "DISPATCH";

FlaxDispatcher.prototype = new EventEmitter();

FlaxDispatcher.prototype.register = function (store, callback) {
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
    // TODO remove this method?
    store.resetState();
  });
};

FlaxDispatcher.prototype.playActions = function(payloads, index) {
  if (typeof index !== 'undefined') {
    for (var i = 0; i <= index; i++) {
      _dispatcher.dispatch(payloads[i]);
    }
    return;
  }

  payloads.forEach((payload) => {
    _dispatcher.dispatch(payload);
  });
};

FlaxDispatcher.prototype.playActionsUntilIndex = function(index) {
  this.resetAllStores();

  if (typeof index !== 'undefined') {
    for (var i = 0; i < index; i++) {
      _dispatcher.dispatch(_actionHistory[i]);
    }
  }
};

FlaxDispatcher.prototype.rollback = function() {
  this.resetAllStores();

  this.playActions(_actionHistory);
};

export default new FlaxDispatcher();