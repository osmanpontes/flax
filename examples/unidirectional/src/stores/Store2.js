import Flax from '../../../../';
import AppActions from '../actions/Actions';

const Store2 = Flax.createStore({
  displayName: 'Store2',

  getInitialState() {
    return {};
  },

  getActionBinds() {
    return [
      [AppActions.sync2, this._handleSync2, this.ON_STORE_2_SYNC_2]
    ];
  },

  _handleSync2(data) {
    console.log('Store2 received data: ' + data);

    console.log('Store2 finished handling sync2');
  },

  events: {
    ON_STORE_2_SYNC_2: null
  },

  getters: {}

});

export default Store2;