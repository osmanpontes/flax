import Flax from '../../../../';
import AppActions from '../actions/Actions';

import Store2 from './Store2';
import Store3 from './Store3';

const Store1 = Flax.createStore({
  displayName: 'Store1',

  getInitialState() {
    return {};
  },

  getActionBinds() {
    return [
      [AppActions.sync1, this._handleSync1, this.ON_STORE_1_SYNC_1]
    ];
  },

  _handleSync1(data) {
    console.log('Store1 received data: ' + data);

    console.log('Store1 is waiting for Store2 and Store3');

    this.waitFor([Store2, Store3]);

    console.log('Store1 finished handling sync1');
  },

  events: {
    ON_STORE_1_SYNC_1: null
  },

  getters: {}

});

export default Store1;