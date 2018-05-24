import React from 'react';
import { renderToString } from 'react-dom/server';
import App from 'common/react/index';

export function renderReactApp(data) {
    /* render to string is not testable with sinon, 
    why this is I have no idea */
    renderToString(<App data={data} />);
}
