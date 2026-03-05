
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { email, code, newPassword } = body;   
  try {
    const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/reset-password`, { email, code, newPassword });
    
    return response;
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return {
          isSuccessful: false,
          message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    }
  }
});   