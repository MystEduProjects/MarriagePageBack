const pkg = require('transbank-sdk');

const { WebpayPlus, Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = pkg;

const tx = new WebpayPlus.Transaction(
  new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
);

module.exports = { tx };