import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import { register } from './service-worker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
       <App />
    </AuthProvider>
);

register();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
    // console.log('SW registered: ', registration);
    }).catch(registrationError => {
    // console.log('SW registration failed: ', registrationError);
});
});
}

// If you want to start measuring performance in your app, pass a function

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
