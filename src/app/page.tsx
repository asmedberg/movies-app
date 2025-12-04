import GenreFilters from "@/components/GenreFilters";
import Results from "@/components/Results";

export default async function Home() {
  return (
    <>
      <section className="section">
        <div className="content">
          <h2>Movie Search</h2>
          <GenreFilters />
          <Results />
        </div>
      </section>
    </>
  );
}
