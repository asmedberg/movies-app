import MovieDetails from "@/components/Movies/Details";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MovieDetails id={id} />;
}
