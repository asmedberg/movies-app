const access_token = process.env.TMDB_READ_ACCESS_TOKEN;

export async function GET() {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
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

    const { genres } = await res.json();

    return Response.json(genres);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch movie genres: ${error}`);
  }
}
