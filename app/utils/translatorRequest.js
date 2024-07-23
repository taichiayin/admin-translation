const axios = require('axios');
const config = require('../config/config').platform;

const { translationKey, translationUrl, translationRegion, translationOutputLang, translationApiVer } = config;

// console.log(`${translationUrl}?api-version=${translationApiVer}&to=${translationOutputLang}`);

const request = axios.create({
    baseURL: translationUrl,
    headers: {
        'Ocp-Apim-Subscription-Key': translationKey,
        'Ocp-Apim-Subscription-Region': translationRegion,
        'Content-type': 'application/json',
    },
});

module.exports = request;