
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  
  const { fileName, base64Content } = body;

  try {
    const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/upload/base64file`, { fileName, base64Content }, true);
    return response;
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return {
        isSuccessful: false,
        message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    }
  }
})