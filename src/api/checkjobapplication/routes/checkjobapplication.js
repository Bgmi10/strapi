// src/api/application/routes/application.js

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/user-applications',
        handler: 'checkjobapplication.findUserApplications',
},
    ],
  };
  