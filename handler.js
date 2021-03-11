const codeResponse = require("./utils/statusCode");

async function handler(event, context) {
    const { transactions } = JSON.parse(event.body);
    const dolar = 90.58 + Math.random();
    let totalEnPesos = 0;

    //si no existe el parametro

    if (!transactions) {
        return {
            statusCode: 400,
            body: 'Bad request due to missing a required parameter'
        }
    }
     
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

    //Si el status es 500
    if (statusCode === 500) {
        response = codeResponse(500, "Internal Server Error");
    } else {
        //si la operacion fue exitosa
        response = {
            body: JSON.stringify({
                status: 200,
                message: "OK",
                balance: {
                    amounts: {
                        ars: totalEnPesos,
                        usd: totalEnPesos / dolar
                    }
                }
            })
        }
    }
}

module.exports = { handler };