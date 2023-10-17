<<<<<<< HEAD
class ApiError extends Error{
    constructor (message, statusCode) {
        super();
=======
class ApiError{
    constructor(statusCode,message) {
>>>>>>> 353a134 (Cai dat handle truy xuat CSDL)
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = ApiError;
