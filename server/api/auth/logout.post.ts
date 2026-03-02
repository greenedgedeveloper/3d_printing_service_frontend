
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {

    const logoutResponse = await $fetch(`${config.apiServerBaseUrl}/api/auth/logout`, {
      method: "POST",
    });

    const tokenCookie = useCookie('auth_token');
    tokenCookie.value = null;

    const userCookie = useCookie('auth_user');
    userCookie.value = null;
    
    return {
        isSuccessful: true,
        message: 'Logged out successfully'
    }
  } catch (error) {
    console.error("Logout error:", error);
    return {
        isSuccessful: false,
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.'
    }
  }
});