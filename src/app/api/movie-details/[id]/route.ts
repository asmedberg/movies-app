const access_token = process.env.TMDB_READ_ACCESS_TOKEN;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: true, message: "Missing movie id" });
  }

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!res.ok) {
      const { statusText } = await res.json();

      return Response.json({ error: true, message: statusText });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie details: ${error}`);
  }
}
