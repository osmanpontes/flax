const StoreWatcher = {
  componentDidMount() {
    var binds = this.getEventBinds();

    binds.forEach(bind => {
      var event = bind[0];
      var handler = bind[1];
      event.store.addChangeListener(event, handler);
    });
  },

  componentWillUnmount() {
    var binds = this.getEventBinds();

    binds.forEach(bind => {
      var event = bind[0];
      var handler = bind[1];

      event.store.removeChangeListener(event, handler);
    });
  }
};

export default StoreWatcher;