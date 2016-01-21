const StoreWatcher = {
  __binds__: [],

  bind(store, event, handler) {
    this.__binds__.push({store, event, handler});
  },

  componentDidMount() {
    this.__binds__.forEach(bind => {
      var {event, handler} = bind;
      store.listen(event, handler);
    });
  },

  componentWillUnmount() {
    this.__binds__.forEach(bind => {
      var {event, handler} = bind;
      store.unlisten(event, handler);
    });
  }
};

module.exports = StoreWatcher;