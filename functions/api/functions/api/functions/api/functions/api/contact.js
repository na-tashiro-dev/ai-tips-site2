export async function onRequestPost(context) {
  const env = context.env;
  const data = await context.request.json();
  const message = (data.message || '').toString();

  await env.DB.prepare(`INSERT INTO contacts (message) VALUES (?);`).bind(message).run();

  return Response.json({ ok: true });
}
