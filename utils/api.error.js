class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = `${statusCode}`.startsWith(4) ? "fail" : 'error';
        this.isOperationError = true;
    }
}

module.exports = ApiError;