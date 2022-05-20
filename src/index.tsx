import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './config/store';
import AppComponent from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import ErrorBoundary from './shared/error/error-boundary';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <div>
        <AppComponent />
      </div>
    </Provider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
