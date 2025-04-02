export const errorHandler = (statusCode, message)=>{
    const error = new Error()
    error.statusCode = statusCode //400
    error.message = message  //user already exists
    return error
}