import { ApiPost } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const request = await readBody(event);
    const { email, password } = request;

    const loginUrl = `${config.apiServerBaseUrl}/api/auth/login`;

    const loginResponse = await ApiPost(event, loginUrl, { email, password });

    console.log(loginResponse);

    const { data, message, isSuccessful } = loginResponse as any

    if (isSuccessful) {
        // ✅ set secure httpOnly cookie (token)
        setCookie(event, 'auth_token', data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        setCookie(event, 'auth_user', JSON.stringify(data.user), {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })

        console.log('User logged in successfully:', data.user);

        return {
          isSuccessful: true,
          message: message,
          user: data.user
        }
    }

    return loginResponse;

  }
  catch (error) {
    console.error("Login error:", error);
    
    return {
      isSuccessful: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.'
    }
  }

});
