const StoreWatcher = {
  componentDidMount() {
    let binds = this.getEventBinds();

    binds.forEach(bind => {
      let event = bind[0];
      let handler = bind[1];
      event.store.addChangeListener(event, handler);
    });
  },

  componentWillUnmount() {
    let binds = this.getEventBinds();

    binds.forEach(bind => {
      let event = bind[0];
      let handler = bind[1];

      event.store.removeChangeListener(event, handler);
    });
  }
};

export default StoreWatcher;