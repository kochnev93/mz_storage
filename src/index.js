import React from 'react';
import { createRoot } from 'react-dom/client';
import Favicon from 'react-favicon';
import Advt from './components/elements/advt/Advt.jsx';

// Redux
import { store } from './store/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

import App from './app.js';

function Root() {
  return (
    <React.StrictMode>
      <Favicon url="../favicon.ico" />
      <Provider store={store}>
        <Advt />
        <App />
      </Provider>
    </React.StrictMode>
  );
}

root.render(<Root/>);
