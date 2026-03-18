import type { H3Event, EventHandlerRequest } from 'h3';

async function ApiGet(event: H3Event<EventHandlerRequest>, url: string, mustAuthenticate: boolean = false, query: any={}){
    const authToken = await getAuthToken(event);
    if (mustAuthenticate && !authToken) {
        return {
            isSuccessful: false,
            message: 'Authentication required. Please log in.'
        }
    }

    return await $fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        query
    })
}

async function ApiPost(event: H3Event<EventHandlerRequest>, url: string, body: any, mustAuthenticate: boolean = false){
    const authToken = await getAuthToken(event);

    console.log("API POST Request:", { url, body, authToken: authToken });

    if (mustAuthenticate && !authToken) {
        return {
            isSuccessful: false,
            message: 'Authentication required. Please log in.'
        }
    }

    return await $fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
        body
    })
}

async function ApiPut(event: H3Event<EventHandlerRequest>, url: string, body: any, mustAuthenticate: boolean = false){
    const authToken = await getAuthToken(event);
    
    if (mustAuthenticate && !authToken) {
        return {
            isSuccessful: false,
            message: 'Authentication required. Please log in.'
        }
    }

    return await $fetch(url, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
        body
    })
}

async function ApiDelete(event: H3Event<EventHandlerRequest>, url: string, mustAuthenticate: boolean = false){
    const authToken = await getAuthToken(event);

    if (mustAuthenticate && !authToken) {
        return {
            isSuccessful: false,
            message: 'Authentication required. Please log in.'
        }
    }

    return await $fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    })
}


async function refreshAuthToken(event: H3Event<EventHandlerRequest>){
    const refreshToken = getCookie(event, 'refresh_token');
    if (!refreshToken) return null;

    console.log("Attempting to refresh auth token with refresh token:", refreshToken);
    const response = await $fetch(`${useRuntimeConfig().apiServerBaseUrl}/api/auth/refresh-token`, {
        method: "POST",
        body: { refreshToken }
    });

    console.log("Refresh token response:", response);

    const { data, message, isSuccessful } = response as any

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

        console.log('User data set in cookies:', data.user);

        return {
          isSuccessful: true,
          message: message,
          user: data.user,
          authToken: data.token
        }
    }

    return response;
}

async function  getAuthToken(event: H3Event<EventHandlerRequest>){
    const authToken = getCookie(event, 'auth_token');
    if (authToken) return authToken;

    console.log("No auth token found, attempting to refresh...");
    const refreshToken = getCookie(event, 'refresh_token');
    if (refreshToken) {
        console.log("Refresh token found, attempting to refresh auth token...");

        const refreshResponse = await refreshAuthToken(event) as any;
        if (refreshResponse && refreshResponse.isSuccessful) {
            return refreshResponse.authToken;
        }
    } else {
        console.log("No refresh token found. User is not authenticated.");
    }

    return null;
}

export { ApiGet, ApiPost, ApiPut, ApiDelete, getAuthToken }