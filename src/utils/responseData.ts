interface Response {
    success: boolean;
    errMsg?: string;
    data: any;
}

export const getResponseData = (data: any, errMsg?: string): Response => {
    if (errMsg) {
        return {
            success: false,
            errMsg,
            data
        }
    }
    return {
        success: true,
        data
    }
}