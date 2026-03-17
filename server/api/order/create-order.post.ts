

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/order/create-order`, body, true);
    
    return response;
  } catch (error: any) {
    console.error("Error creating order:", error);
    return {
      isSuccessful: false,
      message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    } 
  }
});