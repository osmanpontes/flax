import StoreWatcher from './StoreWatcher';
import ActionCreatorFactory from './ActionCreatorFactory';
import StoreFactory from './StoreFactory';
import FlaxDispatcher from './FlaxDispatcher';
import assign from 'object-assign';

if (typeof Object.assign === 'undefined') {
  Object.assign = assign;
}

var createActionCreator = ActionCreatorFactory.createActionCreator;
var createStore = StoreFactory.createStore;

export {
  FlaxDispatcher,
  createActionCreator,
  createStore,
  StoreWatcher
};

const flax = {
  createActionCreator,
  createStore,
  StoreWatcher
};

export default flax;