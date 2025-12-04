import { type NextRequest } from "next/server";

const access_token = process.env.TMDB_READ_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  const genre = request.nextUrl.searchParams.get("genre");

  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  const params = new URLSearchParams({
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: "1",
    sort_by: "popularity.desc"
  });

  if (genre) params.set("with_genres", genre);
  url.search = params.toString();

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!res.ok) {
      const { status_message } = await res.json();

      return Response.json({ error: true, message: status_message ?? res.statusText }, { status: res.status });
    }

    const { results } = await res.json();

    return Response.json(results);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch popular movies" }, { status: 500 });
  }
}
