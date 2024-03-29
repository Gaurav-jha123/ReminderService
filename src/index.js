const express = require('express');
const bodyParser = require('body-parser');
const {PORT, REMINDER_BINDING_KEY}=require('./config/serverConfig')
//const {sendBasicEmail}=require('./services/email-service')
const {createChannel, susbscribeMessage}=require('./utils/messageQueue')
const jobs=require('../src/utils/cron-job');
const TicketController=require('./controllers/ticket-controller');
const EmailService=require('./services/email-service');
const app = express();
const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.post('api/v1/tickets',TicketController.create);
    const channel= await createChannel();
    susbscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);
    
    app.listen(PORT,  () => {
        console.log(`Server started at port ${PORT}`);
        //jobs();
    });


}

setupAndStartServer();