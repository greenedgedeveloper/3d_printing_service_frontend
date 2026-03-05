

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { email } = body;   
  try {
    const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/send-forgot-password-code?email=${email}`, {  });
    
    return response;
  } catch (error: any) {
    console.error("Error sending forgot password code:", error);
    return {
        isSuccessful: false,
        message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    }
  }
});   