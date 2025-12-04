import GenreButton from "@/components/ui/GenreButton";
import Results from "@/components/Results";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { genre } = await searchParams;

  return (
    <>
      <section className="section">
        <div className="content">
          <h2>Movie Search</h2>
          <div style={{ margin: "2rem 0" }}>
            <GenreButton pathname="/" query="27" active={genre === "27" ? true : false}>
              Horror
            </GenreButton>
          </div>
          <Results />
        </div>
      </section>
    </>
  );
}
