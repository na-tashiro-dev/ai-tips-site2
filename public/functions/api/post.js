export async function onRequestPost(context) {
  const env = context.env;
  const data = await context.request.json();

  const { title = '', summary = '', detail = '', tags = '', thumbnail = '' } = data;

  await env.DB.prepare(
    `INSERT INTO posts (title, summary, detail, tags, image_url)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(title, summary, detail, tags, thumbnail).run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
