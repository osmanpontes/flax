import Store from './Store';

const StoreFactory = {
  createStore(spec) {
    return new Store(spec);
  }
};

export default StoreFactory;