class AppError{
    message;
    statusCode;

    constructor(message, statusCode = 400){
        this.massege = message;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;