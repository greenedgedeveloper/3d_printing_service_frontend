
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const request = await readBody(event);
  const { email, password } = request;

  const loginUrl = `${config.apiServerBaseUrl}/api/auth/login`;

  const loginResponse = await $fetch(loginUrl, {
    method: "POST",
    body: { email, password }
  });

  console.log(loginResponse);
  return loginResponse;

});
