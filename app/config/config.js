require('dotenv').config();
module.exports = Object.freeze({
  platform: {
    port: process.env.PLATFORM_PORT || 3000,
    secret: process.env.PLATFORM_SECRET_KEY,
    jwt_secret: process.env.PLATFORM_JWT_SECRET_KEY,
    exp: process.env.PLATFORM_JWT_EXPIRES_IN,
    translationKey: process.env.PLATFORM_TRANSLATION_API_KEY,
    translationUrl: process.env.PLATFORM_TRANSLATION_API_URL,
    translationRegion: process.env.PLATFORM_TRANSLATION_API_REGION,
    translationOutputLang: process.env.PLATFORM_TRANSLATION_OUTPUT_LANG,
    translationInputLang: process.env.PLATFORM_TRANSLATION_INPUT_LANG,
    translationApiVer: process.env.PLATFORM_TRANSLATION_API_VERSION,
  },
  db: {
    user: process.env.DEFAULT_DB_MASTER_USER,
    password: process.env.DEFAULT_DB_MASTER_PASSWORD,
    host: process.env.DEFAULT_DB_MASTER_HOST,
    port: process.env.DEFAULT_DB_MASTER_PORT,
    database: process.env.DEFAULT_DB_MASTER_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  translateLang:['PT-BR', 'vi',]
});
