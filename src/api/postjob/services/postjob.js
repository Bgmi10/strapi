'use strict';

/**
 * postjob service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::postjob.postjob');
