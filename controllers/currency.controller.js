const soapClientModule = require("../services/soap.client");

const helpers = require("../helpers/helpers");

exports.getConvert = async (req, res, next) => {
  try {
    const { productPrice, selectedCurrency } = req.body;

    await soapClientModule.createSoapClient();

    const usdToEur = await soapClientModule.performSoapRequest({
      TheDate: helpers.getFormatDate(),
      Moneda: "USD",
    });

    const convertParams = {
      TheDate: helpers.getFormatDate(),
      Moneda: selectedCurrency,
    };
    const currencyMultiplier = selectedCurrency === "EUR" ? 1 : usdToEur;

    const converted = await soapClientModule.performSoapRequest(convertParams);

    const convertedPrice = helpers.getProductPrice(
      productPrice * currencyMultiplier * converted,
      selectedCurrency
    );

    res.json({ convertedPrice });
  } catch (e) {
    next(e);
  }
};
