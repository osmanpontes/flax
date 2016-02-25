import Flax from '../../../../';
import AppActions from '../actions/Actions';

import Store1 from './Store1';
import Store2 from './Store2';

const Store3 = Flax.createStore({
  displayName: 'Store3',

  getInitialState() {
    return {};
  },

  getActionBinds() {
    return [
      [AppActions.sync1, this._handleSync1, this.ON_STORE_3_SYNC_1],
      [AppActions.sync2, this._handleSync2, this.ON_STORE_3_SYNC_2]
    ];
  },

  _handleSync1(data) {
    console.log('Store3 received data: ' + data);

    console.log('Store3 finished handling sync1');
  },

  _handleSync2(data) {
    console.log('Store3 received data: ' + data);

    console.log('Store3 is waiting for Store1 and Store2');
    this.waitFor(Store1, Store2);

    console.log('Store3 finished handling sync2');
  },

  events: {
    ON_STORE_3_SYNC_1: null,
    ON_STORE_3_SYNC_2: null
  },

  getters: {}

});

export default Store3;