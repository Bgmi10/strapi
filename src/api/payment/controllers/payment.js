'use strict';
const qs = require('qs')
const axios = require('axios');
const crypto = require('crypto');

module.exports = {
    async create(ctx) {
        try {
            const { amount, firstname, email, phone  } = ctx.request.body;

            // Ensure all required fields are present
            if (!amount || !firstname || !email || !phone) {
                return ctx.badRequest('Missing required fields');
            }

            // Replace these with your actual merchant key and salt
            const merchantKey = 'pCHBzS';
            const salt = 'Oncco0EmdtDzhQlAnIPko3HIOIILLUxK';
            if (!merchantKey || !salt) {
                return ctx.badRequest('Merchant key or salt is missing in the backend configuration');
            }

            const txnid = `txn_${Date.now()}`;
            const surl = 'http://localhost:3000/success';
            const furl = 'http://localhost:3000/failure';
            const formattedAmount = parseFloat(amount).toFixed(2).toString();
            const udf1 = '';
            const udf3 = '';
            const udf2 = '';
            const udf4 = '';
            const udf5 = '';
            const productinfo = 'suahs'
            const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}|||||||||||${salt}`;
            const hash = crypto.createHash('sha512').update(hashString , 'utf-8').digest('hex');
            //sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
            const expectedHash = 'bf6c6d43c3faff95a98d96115cd8a5efe0a77fded87aae80e78858f31ce6de1ed4be7eb87f871dda5760be8bc5cea5cf150800616cf9603181c0cb393b4c232e';
            console.log(hash === expectedHash);


            const paymentData = {
                key: merchantKey,
                txnid: txnid,
                amount: formattedAmount,
                productinfo: productinfo,
                firstname: firstname,
                email: email,
                phone: phone,
                surl: surl,
                furl: furl,
                hash : hash
                
            };
             
            const payUUrl = 'https://test.payu.in/_payment';

            // Log the data being sent to PayU for debugging purposes
            console.log('Request to PayU:', paymentData);

            // Make the request to PayU

            const formdata = qs.stringify(paymentData)
            const response = await axios.post(payUUrl, formdata , {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            } );

            // Log the response from PayU
            console.log('Response from PayU:', response.data);

            // Send the response back to the client
            ctx.send(response.data);
        } catch (error) {
            console.error('Error during payment processing:', error.response ? error.response.data : error.message);
            ctx.throw(500, 'Error processing payment', { error: error.response ? error.response.data : error.message });
        }
    },
};
