import StoreWatcher from './src/StoreWatcher';
import StoreEventHandler from './src/StoreEventHandler.js';
import ActionCreatorFactory from './src/ActionCreatorFactory';
import StoreFactory from './src/StoreFactory';
import FlaxDispatcher from './src/FlaxDispatcher'

const createActionCreator = ActionCreatorFactory.createActionCreator;
const createStore = StoreFactory.createStore;

export {
  createActionCreator,
  createStore,
  FlaxDispatcher,
  StoreWatcher,
  StoreEventHandler
};

const Flax = {
  createActionCreator,
  createStore,
  FlaxDispatcher,
  StoreWatcher,
  StoreEventHandler
};

export default Flax;