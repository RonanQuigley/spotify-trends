function checkForServerChanges() {
    // do not try to import this as it'll show up in production builds
    const webpackHotMiddleware = require('webpack-hot-middleware/client');
    webpackHotMiddleware.subscribe(message => {
        if (message.reload === true) {
            window.location.reload();
        }
    });
}

if (process.env.NODE_ENV === 'development') {
    checkForServerChanges();
}

// change me to a different colour and see the changes reflected in browser
// document.body.style.background = 'red';

if (module.hot) {
    module.hot.accept();
}
