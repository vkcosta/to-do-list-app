import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './output.css';
import { FirebaseProvider } from './firebase/firebaseContext';
import './global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </React.StrictMode>
);

