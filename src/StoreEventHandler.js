import React from 'react';
import StoreEvent from './StoreEvent';

const StoreEventHandler = React.createClass({
  _addChangeListener(event, handler) {
    if (!(event instanceof StoreEvent)) throw new TypeError("'event' prop should be an instance of StoreEvent");
    if (typeof handler !== 'function') throw TypeError("'handler' prop should be a function");

    event.store.addChangeListener(event, handler);
  },

  _removeChangeListener(event, handler) {
    if (!(event instanceof StoreEvent)) return;
    if (typeof handler !== 'function') return;

    event.store.removeChangeListener(event, handler);
  },

  componentDidMount() {
    let {event, handler} = this.props;

    if (Array.isArray(event)) {
      return event.forEach(e => {
        this._addChangeListener(e, handler);
      })
    }

    this._addChangeListener(event, handler);
  },

  componentWillUnmount() {
    let {event, handler} = this.props;

    if (Array.isArray(event)) {
      return event.forEach(e => {
        this._removeChangeListener(e, handler);
      })
    }

    this._removeChangeListener(event, handler);
  },

  render() {
    return false;
  }
});

export default StoreEventHandler;