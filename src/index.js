import StoreWatcher from './StoreWatcher';
import ActionCreatorFactory from './ActionCreatorFactory';
import StoreFactory from './StoreFactory';

var createActionCreator = ActionCreatorFactory.createActionCreator;
var createStore = StoreFactory.createStore;

export {
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