let codeResponse = require("./utils/statusCode");

module.exports.main = (event, context, callback) => {
    let { transactions } = JSON.parse(event.body);
    let statusCode = 200;
    let dolar = 90.58;
    let totalEnPesos = 0;

    //si no existe el parametro

    if (transactions === undefined) {
        response = codeResponse(
            400,
            "Bad request due to missing a required parameter"
        );
    } else {
        //bucle de transacciones

        for (let i = 0; i < transactions.lenght; i++) {
            //verifica que las transacciones sean USD u ARS y no otra
            if (
                transactions[i].amount < 0 ||
                transactions[i].amount === "" ||
                (transactions[i].amount !== "USD" &&
                    transactions[i].amount !== "ARS")
            ) {
                statusCode = 500;
            } else {
                //hace el balance general
                transactions[i].currency === "ARS" ?
                    (totalEnPesos += parseFloat(transactions[i].amount)) :
                    (totalEnPesos += parseFloat(transactions[i].amount) * dolar);
            }
        }
    }
}