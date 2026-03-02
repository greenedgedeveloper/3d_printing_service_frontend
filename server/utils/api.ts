import type { H3Event, EventHandlerRequest } from 'h3';

function ApiGet(event: H3Event<EventHandlerRequest>, url: string){
    const authToken = getCookie(event, 'auth_token');

    return $fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
}

function ApiPost(event: H3Event<EventHandlerRequest>, url: string, body: any){
    const authToken = getCookie(event, 'auth_token');

    return $fetch(url, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
        body
    })
}

function ApiPut(event: H3Event<EventHandlerRequest>, url: string, body: any){
    const authToken = getCookie(event, 'auth_token');
    
    return $fetch(url, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
        body
    })
}

function ApiDelete(event: H3Event<EventHandlerRequest>, url: string){
    const authToken = getCookie(event, 'auth_token');

    return $fetch(url, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    })
}

export { ApiGet, ApiPost, ApiPut, ApiDelete }