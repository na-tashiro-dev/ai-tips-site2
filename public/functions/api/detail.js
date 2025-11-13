export async function onRequest(context) {
  const env = context.env;
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');
  if (!id) return Response.json({ ok: false });

  const { results } = await env.DB.prepare(
    `SELECT id, title, summary, detail, image_url, tags, created_at
     FROM posts WHERE id = ?`
  ).bind(id).all();

  return Response.json({ ok: true, post: results?.[0] || null });
}
