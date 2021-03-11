function statusCode(code, msg) {
    return {
        body: JSON.stringify({
            status: code,
            message: msg
        })
    };
}

module.exports = statusCode