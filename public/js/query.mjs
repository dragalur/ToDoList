export async function clientQuery(url, method, body) {
   return await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow'
   });
}
