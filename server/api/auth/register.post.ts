
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);


    try {
        const response = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/register`, body) as any;

        if (response.isSuccessful) {
            // Registration successful, you can perform additional actions here if needed
            // Perform login after successful registration
            const loginResponse = await ApiPost(event, `${config.apiServerBaseUrl}/api/auth/login`, {
                email: body.email,
                password: body.password
            }, false) as any;

            console.log(loginResponse);

            const { data, message, isSuccessful } = loginResponse as any

            if (isSuccessful) {
                // ✅ set secure httpOnly cookie (token)
                setCookie(event, 'auth_token', data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 5 // 5 minutes
                })

                setCookie(event, 'refresh_token', data.refreshToken, {
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
        }
        return response;
    } catch (error:any) {
        console.error("Error registering user:", error);
        return {
            isSuccessful: false,
            message: error.data || (error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.')
        }
    }
});