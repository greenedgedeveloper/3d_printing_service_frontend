
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const params = await getQuery(event)
    console.log({params})
    try {
        const response = await ApiGet(event, `${config.apiServerBaseUrl}/api/orderMessage/get-order-messages`, true, params);
        return response;
    } catch (error: any) {
        console.error("Error fetching order messages:", error);
        return {
            isSuccessful: false,
            message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
        }
    }
})