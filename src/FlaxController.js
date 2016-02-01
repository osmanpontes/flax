import React from 'react';
import ReactDOM from 'react-dom';

import FlaxDispatcher from './FlaxDispatcher';

const FlaxController = React.createClass({
  getInitialState() {
    var actionHistory = FlaxDispatcher.getActionHistory();
    return {
      actions: actionHistory,
      index: 0
    };
  },

  _handleActionDispatch() {
    //FlaxDispatcher.rollback();
    var actionHistory = FlaxDispatcher.getActionHistory();
    this.setState({
      actions: actionHistory,
      index: actionHistory.length
    });
  },

  componentDidMount() {
    FlaxDispatcher.addListener(FlaxDispatcher.DISPATCH, this._handleActionDispatch);
  },

  componentWillUnmount() {
    FlaxDispatcher.removeListener(FlaxDispatcher.DISPATCH, this._handleActionDispatch);
  },

  _handleRollback() {
    this._handleActionDispatch();
  },

  _handleActionClick(index) {
    //alert(index);
    this.setState({
      index: index
    });

    FlaxDispatcher.playActionsUntilIndex(index);

    if (index === 0) {
      this.props.reset();
      /*ReactDOM.unmountComponentAtNode(document.getElementById('app'));
      ReactDOM.render(<App />, document.getElementById('app'));*/
    }
  },

  render() {
    var i = 0;
    var actionList = [];
    actionList.push(<li onClick={this._handleActionClick.bind(this, i)}
                        key={i++}>Initial State</li>);
    this.state.actions.forEach(function (action) {
      var actionListItem = <li onClick={this._handleActionClick.bind(this, i)}
                               key={i}
                               style={{color: this.state.index >= i ? 'black' : 'grey'}}>{JSON.stringify(action)}</li>;
      i++;
      actionList.push(actionListItem);
    }.bind(this));

    return (
      <div>
        <ul>
          {actionList}
        </ul>
        <button onClick={this._handleRollback}>Rollback</button>
      </div>
    );
  }
});

export default FlaxController;
