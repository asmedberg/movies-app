import { Modal } from "@/components/ui/Modal";
import MovieDetails from "@/components/Movies/Details";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Modal>
      <MovieDetails id={id} />
    </Modal>
  );
}
