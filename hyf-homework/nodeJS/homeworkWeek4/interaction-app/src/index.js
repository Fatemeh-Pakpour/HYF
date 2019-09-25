const express = require('express');
const localtunnel = require('localtunnel');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const subdomain = process.env.SUBDOMAIN;

app.use('/check', (req, res) => {
    res.send('Ok');
})

app.listen(port, () => {
    console.log(`Server is working at ${port}`);
    const tunnel = localtunnel(port, { subdomain }, (err, tunnel) => {
        if (!err)
          console.log('Tunnel is open');
        else
          console.log('Error opening tunnel: ', err);
      });
      
      tunnel.on('close', function() {
        // When the tunnel is closed
        console.log('Tunnel is closed');
      });
})