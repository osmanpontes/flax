import StoreWatcher from './src/StoreWatcher';
import ActionCreatorFactory from './src/ActionCreatorFactory';
import StoreFactory from './src/StoreFactory';
import FlaxController from './src/FlaxController.js';

var createActionCreator = ActionCreatorFactory.createActionCreator;
var createStore = StoreFactory.createStore;

export {
  FlaxController,
  createActionCreator,
  createStore,
  StoreWatcher
};

const Flax = {
  createActionCreator,
  createStore,
  FlaxController,
  StoreWatcher
};

export default Flax;