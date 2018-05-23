import React from 'react';
import { renderToString } from 'react-dom/server';

import App from 'common/react/index';

export function renderAppToString() {
    return renderToString(<App />);
}
