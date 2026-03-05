
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const body = await readBody(event);
    const { email, code } = body;
    try {
        const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/verify-email`, { email, code });
        console.log("Verify email response:", response);
        return response;
    } catch (error: any) {
        console.error("Error verifying email:", error);
        return {
            isSuccessful: false,
            message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
        }
    }
});