import React from 'react';

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
    // Get back to last state every time a new action is fired
    FlaxDispatcher.rollback();

    // Get action history
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
    }
  },

  _syntaxHighlightJSON(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'white';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          // key
          cls = 'white';
        } else {
          // string
          cls = 'greenyellow';
        }
      } else if (/true|false/.test(match)) {
        // boolean
        cls = 'blue';
      } else if (/null/.test(match)) {
        // null
        cls = 'magenta';
      }
      return '<span style="color: ' + cls + ';" >' + match + '</span>';
    });
  },

  render() {
    var i = 0;
    var actionList = [];
    actionList.push(
      <li onClick={this._handleActionClick.bind(this, i)}
          key={i++}
          style={{color: 'white'}}>Initial State</li>
    );
    this.state.actions.forEach(function (action) {
      var actionListItem =
        <li onClick={this._handleActionClick.bind(this, i)}
            key={i}
            style={{backgroundColor: this.state.index >= i ? '#333' : 'grey', color: 'white'}}>
          <pre dangerouslySetInnerHTML={{__html: this._syntaxHighlightJSON(JSON.stringify(action, null, 2))}}></pre>
        </li>;
      i++;
      actionList.push(actionListItem);
    }.bind(this));

    return (
      <div>
        <ul style={{backgroundColor: '#333', listStyleType: 'none', padding: 0}}>
          {actionList}
        </ul>
        <button onClick={this._handleRollback}>Rollback</button>
      </div>
    );
  }
});

export default FlaxController;
