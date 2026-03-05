import { ApiGet } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    

    const currentUserUrl = `${config.apiServerBaseUrl}/api/auth/current_user`;
    const currentUserResponse = await ApiGet(event, currentUserUrl, true);

    return currentUserResponse;
  } catch (error: any) {
    console.error("Error fetching current user:", error);
    return {
        isSuccessful: false,
        message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
    }
  }
});