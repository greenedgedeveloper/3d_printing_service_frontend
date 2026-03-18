import {ApiGet} from "#server/utils/api";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const params = getQuery(event);

    try {
        const url = `${config.apiServerBaseUrl}/api/order/get-user-orders`;
        return await ApiGet(event, url, true, params) as any;
    } catch (error: any) {
        console.error("Error fetching order:", error);
        return {
            isSuccessful: false,
            message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
        }
    }
})