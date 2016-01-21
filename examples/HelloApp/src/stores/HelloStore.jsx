import {Store} from '../../fluxit';
import HelloActions from '../actions/HelloActions.jsx';

var x = 1, y = 2;

const HelloStore = new Store({
  displayName: 'HelloStore',

  getState() {
    return {
      x, y
    };
  },

  getActionBinds() {
    return [
      [HelloActions.loadHellos, this._hello]
    ]
  },

  events: {
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

  }

});

export default HelloStore;