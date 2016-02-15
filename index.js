import StoreWatcher from './src/StoreWatcher';
import ActionCreatorFactory from './src/ActionCreatorFactory';
import StoreFactory from './src/StoreFactory';

var createActionCreator = ActionCreatorFactory.createActionCreator;
var createStore = StoreFactory.createStore;

export {
  createActionCreator,
  createStore,
  StoreWatcher
};

const Flax = {
  createActionCreator,
  createStore,
  StoreWatcher
};

export default Flax;