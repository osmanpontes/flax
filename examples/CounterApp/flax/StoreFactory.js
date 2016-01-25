import Store from './Store';

const StoreFactory = {
  createStore(spec) {
    // Initialize store
    var store = new Store(spec);

    // Create a store facade
    var storeFacade = {};

    // Copy events
    for (var eventName in store.events) {
      if (store.events.hasOwnProperty(eventName)) {
        storeFacade[eventName] = store.events[eventName];
      }
    }

    // Copy getters
    for (var getterName in store.getters) {
      if (store.getters.hasOwnProperty(getterName)) {
        storeFacade[getterName] = store.getters[getterName];
      }
    }

    // Copy getState
    storeFacade.getState = store.getState;
    return storeFacade;
  }
};

export default StoreFactory;