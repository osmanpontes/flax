import FlaxDispatcher from './FlaxDispatcher';

function DispatchCreator(type) {
  this.type = type;
}

DispatchCreator.prototype.dispatch = function (payload) {
  FlaxDispatcher.dispatch({type: this.type, payload});
};

export default DispatchCreator;