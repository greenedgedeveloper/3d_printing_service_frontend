

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)

    try {
        const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/orderMessage/send-user-message`, body, true);
        return response;
    } catch (error: any) {
        console.error("Error sending message:", error);
        return {
            isSuccessful: false,
            message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
        }
    }
})