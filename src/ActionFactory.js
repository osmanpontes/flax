import DispatchCreator from './DispatchCreator';

const ActionFactory = {
  createAction(spec, funcName) {
    let type = `${spec.displayName}/${funcName}`;

    let action = function () {
      return new Promise((resolve, reject) => {
        this.apply(Object.assign(new DispatchCreator(type), spec, {resolve, reject}), arguments);
      });
    }.bind(spec[funcName]);
    action.actionType = type;

    return action;
  }
};

export default ActionFactory;