const logger = require('../utils/logger');
const axios = require('axios').default;
const config = require('../config/config').platform;
const translateRequest = require('../utils/translatorRequest');

const { translationOutputLang, translationApiVer } = config;

// 使用deepl翻譯
exports.translate = async (input) => {
    try {
        const { data } = await translateRequest({
            url: '/translate', 
            method: 'post',
            params:{
                'api-version': translationApiVer,
                'to': translationOutputLang
            },
            data: input,
            responseType: 'json'
        });

        return { code: 1, data: data[0].translations };
        
    } catch (error) {
        throw error;
    }
}
