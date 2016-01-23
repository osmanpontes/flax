import DispatchCreator from './DispatchCreator';

function _createAction(type, func, spec) {
  var action, scope = Object.assign(new DispatchCreator(type), spec);
  action = func.bind(scope);
  action.actionType = type;
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

        this[funcName] = _createAction(`${spec.displayName}/${funcName}`, func, spec);

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