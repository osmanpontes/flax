import StoreWatcher from './StoreWatcher';
import ActionCreator from './ActionCreator';
import Store from './Store';
import assign from 'object-assign';

if (typeof Object.assign === 'undefined') {
  Object.assign = assign;
}

export {ActionCreator, StoreWatcher, Store};