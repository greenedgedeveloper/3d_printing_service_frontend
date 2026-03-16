

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const body = await readBody(event);
    console.log({body: body.id})
    const response = await ApiDelete(event, `${config.apiServerBaseUrl}/api/orderItem/delete-order-item?orderItemId=${body.id}`, true);
    console.log({response})
    return response;
  } catch (error: any) {
    console.error("Error deleting order item:", error);
    return {
      isSuccessful: false,
      message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    } 
  }
});