import React from 'react';
import ReactDOM from 'react-dom';
import App from 'common/react';

const root = document.getElementById('root');
// use render in development, hydrate in production
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(<App />, root);
