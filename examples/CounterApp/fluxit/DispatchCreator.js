import Dispatcher from './Dispatcher';

function DispatchCreator(type) {
  this.type = type;
}

DispatchCreator.prototype.dispatch = function (payload) {
  Dispatcher.dispatch({type: this.type, payload});
};

export default DispatchCreator;