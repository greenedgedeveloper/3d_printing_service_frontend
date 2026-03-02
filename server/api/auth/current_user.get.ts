import { ApiGet } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const currentUserUrl = `${config.apiServerBaseUrl}/api/auth/current_user`;
    const currentUserResponse = await ApiGet(event, currentUserUrl);

    return currentUserResponse;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return {
        isSuccessful: false,
    }
  }
});