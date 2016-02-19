import DispatchCreator from './DispatchCreator';

const ActionFactory = {
  createAction(spec, funcName) {
    var action,
      type = `${spec.displayName}/${funcName}`,
      scope = Object.assign(new DispatchCreator(type), spec);

    action = function () {
      return new Promise((resolve, reject) => {
        this.apply(Object.assign(scope, {resolve, reject}), arguments);
      });
    }.bind(spec[funcName]);
    action.actionType = type;

    return action;
  }
};

export default ActionFactory;