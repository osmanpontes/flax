import Dispatcher from './Dispatcher';

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

        this[funcName] = (function (funcName, func) {
          var scope = Object.assign({
            dispatch(payload) {
              // TODO ActionCreator displayName to make funcName belongs to ActionCreator
              Dispatcher.dispatch({type: funcName, payload});
            }
          }, spec);
          return function () {
            func.apply(scope, arguments);
          };
        })(funcName, func);

        // HACK
        spec[funcName] = this[funcName];

        this[funcName].actionType = funcName;
        break;
      default:
        this[propName] = spec[propName];
        break;
    }
  }
};

export default ActionCreator;