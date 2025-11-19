const access_token = process.env.TMDB_READ_ACCESS_TOKEN;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    if (!res.ok) {
      const { status_message } = await res.json();

      return Response.json({ error: true, message: status_message });
    }

    const { results } = await res.json();

    return Response.json(results);
  } catch (error) {
    throw new Error(`Failed to fetch popular movies: ${error}`);
  }
}
