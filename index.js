const express = require('express');
const app = express();
const next = require('next');
const nextApp = next({ dev: false });
const nextHandler = nextApp.getRequestHandler();
const https = require('https');
const fs = require('fs');
const port = 443;

var options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/mncomputerclub.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/mncomputerclub.com/privkey.pem'),
};

(async () => {
    await nextApp.prepare();

    app.get('*', (req, res) => {
        return nextHandler(req, res);
    });

    const server = https.createServer(options, app).listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
})();
