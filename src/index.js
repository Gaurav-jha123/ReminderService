const express = require('express');
const bodyParser = require('body-parser');
const {PORT}=require('./config/serverConfig')
const {sendBasicEmail}=require('./services/email-service')

const app = express();
const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
        sendBasicEmail(
            'ManishMehta@gmail.com',
            'satyam987321@gmail.com',
            'Escalations@Cvent.in',
            'IMPORTANT, hey satyam please see this immediately'
        
        )
    });


}

setupAndStartServer();