import { renderToString } from 'react-dom/server';
import JssProvider from 'react-jss/lib/JssProvider';
import React from 'react';

export default function serverSideRender(apps, registry, generateClassName) {
    return renderToString(
        <JssProvider registry={registry} generateClassName={generateClassName}>
            {apps}
        </JssProvider>
    );
}
