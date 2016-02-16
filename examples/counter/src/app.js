import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

function resetApp() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(<App />, document.getElementById('app'));
}

resetApp();