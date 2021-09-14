
const stripe = require('stripe')('sk_test_51JYwVoAOdPwZgIGSgPNdoGpzjOP4Dwd0rEiyXmbVTOfCOnP2LDc30yjao8pwRnLSdussGztOCzQmXv0doXB8QvyJ00axBuQ2KN');
const express = require('express');
const app = express();
app.use(express.static('public'));
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: false,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {

    const itemList = req.body.data;
    let line_items = itemList.map(item => ({ price: item.price, quantity: parseInt(item.quantity) }));    

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        payment_method_types: [
            'card',
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });
    res.json({ "url": session.url });
});
app.listen(4000, () => console.log('Running on port 4000'));