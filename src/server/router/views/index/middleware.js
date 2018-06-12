export function renderPage(req, res, next) {
    const pageTitle = `Statisfy`;
    const env = process.env.NODE_ENV;
    const dev = env === 'development' ? `<script src="/dev.js"></script>` : ``;
    const font = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';

    const payload = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href=${font}>
            <title>${pageTitle}</title>
            <script src="/index.js"></script>
        </head>
        <body>
            <div id="root">Statisfy - A Spotify Music Analyzer</div>                        
            <div id="login-wrapper">
                <a href="/login">Login</a>
            </div>
            ${dev}
        </body>
    </html>`;

    res.send(payload);
}
