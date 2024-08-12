'use strict';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/payments',
            handler: 'payment.create',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
