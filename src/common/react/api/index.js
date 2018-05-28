import React from 'react';
import App from 'common/react/index';

export const id = {
    TRACKS: 'tracks',
    ARTISTS: 'artists'
};

export function buildApp(data, id) {
    return <App data={data} id={id} />;
}
