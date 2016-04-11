import StoreWatcher from './src/StoreWatcher';
import StoreEventHandler from './src/StoreEventHandler.js';
import ActionCreatorFactory from './src/ActionCreatorFactory';
import StoreFactory from './src/StoreFactory';

var createActionCreator = ActionCreatorFactory.createActionCreator;
var createStore = StoreFactory.createStore;

export {
  createActionCreator,
  createStore,
  StoreWatcher,
  StoreEventHandler
};

const Flax = {
  createActionCreator,
  createStore,
  StoreWatcher,
  StoreEventHandler
};

export default Flax;