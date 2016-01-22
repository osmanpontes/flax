import {Store} from '../../fluxit';
import HelloActions from '../actions/CounterActions.jsx';

var _state = {
  x: 0,
  y: 0
};

const CounterStore = new Store({
  displayName: 'CounterStore',

  getState() {
    return _state;
  },

  getActionBinds() {
    return [
      [HelloActions.loadHellos, this._hello]
    ]
  },

  events: {
    INC_X: null,
    INC_Y: null,
    HELLO: null,
    BYE: null
  },

  _hello(payload) {
    //var {state, data} = payload;
    //this.waitFor(OtherStore, AnotherStore);
    //state.x.push(data);
    //
    //this.emit();

    alert('store: ' + JSON.stringify(payload));

    this.emitChange(this.events.INC_X);
  }

});

export default CounterStore;