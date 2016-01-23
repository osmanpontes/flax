import Dispatcher from './Dispatcher';

function createDispatchable(type) {
  return {
    dispatch(payload) {
      // TODO ActionCreator displayName to make funcName belongs to ActionCreator
      Dispatcher.dispatch({type, payload});
    }
  };
}

function createAction(funcName, func, spec) {
  var action, scope = Object.assign(createDispatchable(funcName), spec);
  action = func.bind(scope);
  action.actionType = funcName;
  return action;
}

var ActionCreator = function (spec) {
  var func, funcName;
  for (var propName in spec) {
    if (!spec.hasOwnProperty(propName)) {
      continue;
    }

    switch (typeof spec[propName]) {
      case 'function':
        funcName = propName;
        func = spec[funcName];

        this[funcName] = createAction(funcName, func, spec);

        // HACK
        spec[funcName] = this[funcName];

        break;
      default:
        this[propName] = spec[propName];
        break;
    }
  }
};

export default ActionCreator;