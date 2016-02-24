import Store from './Store';

const StoreFactory = {
  createStore(spec) {
    // TODO verify specs
    if (typeof spec.displayName !== 'string') {
      console.warn('Store specification should provide displayName property as a string. A random name will be generated for this store otherwise.');
      // TODO generate random uuid?
      // spec.displayName =
    }

    if (typeof spec.getInitialState !== 'function') {
      // TODO
    }

    if (typeof spec.getActionBinds !== 'function') {
      // TODO
    }

    /*if (typeof spec.getters !== 'undefined') {

    }*/

    // Initialize store
    let store = new Store(spec);

    // Create a store facade
    let storeFacade = {};

    // Copy events
    for (let eventName in store.events) {
      if (store.events.hasOwnProperty(eventName)) {
        storeFacade[eventName] = store.events[eventName];
      }
    }

    // Copy getters
    for (let getterName in store.getters) {
      if (store.getters.hasOwnProperty(getterName)) {
        storeFacade[getterName] = store.getters[getterName];
      }
    }

    // Copy state variable
    storeFacade.state = store.state;

    // Copy getState
    storeFacade.getState = store.getState;

    return storeFacade;
  }
};

export default StoreFactory;