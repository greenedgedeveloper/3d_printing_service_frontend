
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/change-password`, body, true);
    
    return response;
  } catch (error:any) {
    console.error("Error changing password:", error);
    return {
        isSuccessful: false,
        message: error.data
    }
  }
});   