

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const response = await ApiGet(event, `${config.apiServerBaseUrl}/api/order/get-pending-order-items`, true);
    return response;
  } catch (error: any) {
    console.error("Error saving order item:", error);
    return {
      isSuccessful: false,
      message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    } 
  }
});