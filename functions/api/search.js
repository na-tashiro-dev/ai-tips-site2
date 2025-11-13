export async function onRequest(context) {
  const env = context.env;
  const url = new URL(context.request.url);
  const q = (url.searchParams.get('q') || '').trim();

  if (!q) {
    const { results } = await env.DB.prepare(
      `SELECT id, title, summary, image_url, created_at FROM posts ORDER BY created_at DESC LIMIT 20`
    ).all();
    return Response.json({ ok: true, results });
  }

  const like = `%${q}%`;
  const { results } = await env.DB.prepare(
    `SELECT id, title, summary, image_url, created_at
     FROM posts
     WHERE title LIKE ? OR summary LIKE ? OR tags LIKE ?
     ORDER BY created_at DESC`
  ).bind(like, like, like).all();

  return Response.json({ ok: true, results });
}
