const globalErorr = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.isOperationError = err.isOperationError || true;
    if (process.env.MODE_ENV == 'production') sendProdError(err, res);
    if (process.env.MODE_ENV === "development") sendDevError(err, res);


}


const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: {
            statusCode: err.statusCode,
            isOperationError: err.isOperationError,
        },
        message: err.message,

        stack: err.stack,
    });
}

const sendProdError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
}

module.exports = globalErorr;