import MovieDetails from "@/components/Movies/MovieDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
      <MovieDetails id={id} />
    </div>
  );
}
