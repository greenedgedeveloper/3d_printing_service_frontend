import { ApiPost } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {

    const logoutResponse = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/logout`, {}, true);

    const tokenCookie = useCookie('auth_token');
    tokenCookie.value = null;

    const userCookie = useCookie('auth_user');
    userCookie.value = null;
    
    return logoutResponse;
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
        isSuccessful: false,
        message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    }
  }
});