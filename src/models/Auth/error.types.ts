type ErrorResponse = {
    data: {
        Error: string
    };
    status: number;
    statusText: string;
}

export class UserError extends Error {
    code: string;
    response: ErrorResponse;
    constructor(message: string, code: string, response: ErrorResponse) {
        super(message);
        this.name = "UserError";
        this.code = code;
        this.response = response
    }
}