const helpers = require("../helpers/helpers");
const soap = require("soap");

exports.getConvert = async (req, res, next) => {
  try {
    const { productPrice, selectedCurrency } = req.body;

    soap.createClient(
      "http://www.infovalutar.ro/cursbce.asmx?wsdl",
      {},
      (err, client) => {
        client.getvalue(
          { TheDate: helpers.getFormatDate(), Moneda: "USD" },
          (err, result) => {
            let usdToEur = result.getvalueResult;
            if (selectedCurrency === "EUR") {
              let converted = result.getvalueResult * productPrice;
              res.json({
                convertedPrice: helpers.getProductPrice(
                  converted,
                  selectedCurrency
                ),
              });
            } else {
              client.getvalue(
                { TheDate: helpers.getFormatDate(), Moneda: selectedCurrency },
                (err, result) => {
                  let converted =
                    result.getvalueResult * productPrice * usdToEur;
                  console.log(converted);
                  res.json({
                    convertedPrice: helpers.getProductPrice(
                      converted,
                      selectedCurrency
                    ),
                  });
                }
              );
            }
          }
        );
      }
    );
  } catch (e) {
    next(e);
  }
};
