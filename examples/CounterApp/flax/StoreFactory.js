import Store from './Store';

const StoreFactory = {
  createStore(spec) {
    // TODO verify specs
    if (typeof spec.displayName !== 'string') {
      console.warn('Store specification should provide displayName property as a string. A random name will be generated for this store otherwise.');
      // TODO generate random uuid?
      // spec.displayName =
    }

    if (typeof spec.getState !== 'function') {
      // TODO
    }

    if (typeof spec.getActionBinds !== 'function') {
      // TODO
    }

    /*if (typeof spec.getters !== 'undefined') {

    }*/

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