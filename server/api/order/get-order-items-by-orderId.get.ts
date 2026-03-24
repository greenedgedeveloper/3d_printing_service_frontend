

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  try {
    const response = await ApiGet(event, `${config.apiServerBaseUrl}/api/orderItem/get-by-orderId?orderId=${query.orderId}`, true);
    console.log({response})
    return response;
  } catch (error: any) {
    console.error("Error getting order items by orderId:", error);
    return {
      isSuccessful: false,
      message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    } 
  }
});