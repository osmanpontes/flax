import {ActionCreator} from '../../fluxit';

const HelloActions = new ActionCreator({
  loadHellos(query) {
    var payload = {
      x: query + 1
    };
    this.dispatch({
      data: payload,
      state: 'SUCCESS'
    });
  },

  sendHello(x) {
    if (x > 0) return this.dispatch('positive');
    return this.dispatch('negative');
  }
});

export default HelloActions;