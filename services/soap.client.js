const soap = require("soap");

// Create a SOAP client instance
let soapClient;

// Initialize the SOAP client
exports.createSoapClient = () => {
  return new Promise((resolve, reject) => {
    soap.createClient(
      "http://www.infovalutar.ro/cursbce.asmx?wsdl",
      {},
      (err, client) => {
        if (err) {
          reject(err);
        } else {
          soapClient = client;
          resolve(client);
        }
      }
    );
  });
};

// Perform a SOAP request
exports.performSoapRequest = (params) => {
  return new Promise((resolve, reject) => {
    if (!soapClient) {
      reject(new Error("SOAP client not initialized."));
      return;
    }

    soapClient.getvalue(params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.getvalueResult);
      }
    });
  });
};
