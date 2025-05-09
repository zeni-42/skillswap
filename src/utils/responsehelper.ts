class ResponseHelper {
    static success(data: any = null, message = "Success", status = 200): Response {
        return new Response(
            JSON.stringify({
                status,
                success: true,
                message,
                data,
            }),
            { status }
        );
    }

    static error(message = "Somthing went wrong", status = 400, errors: any = null): Response {
        return new Response(
            JSON.stringify({
                status,
                success: false,
                message,
                errors,
            }),
            { status }
        );
    }
}

export default ResponseHelper;
