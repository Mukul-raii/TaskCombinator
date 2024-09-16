class apiResponse {
    constructor(statusCode, status, message, data) {
        this.statusCode = statusCode
        this.status = status
        this.message = message
        this.data = data
    }
}

export default apiResponse