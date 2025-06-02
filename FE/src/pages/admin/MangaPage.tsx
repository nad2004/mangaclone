// pages/admin/MangaPage.tsx
import { Button } from "@mui/material";
import useFetchAll from "@/components/hooks/useFetchAll";
import MangaCard from "@/components/ui/MangaCard";
export default function MangaPage() {
  const {data: manga, isLoading, isError, error} = useFetchAll('/stories');
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div> 
      <h1 className="text-2xl font-bold mb-4">Quản lý Manga</h1>
      <div className="flex justify-end mb-4">
        <Button>Tạo mới Manga</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" >
       {/* Header and Button */
      manga.length > 0 && manga.map((item: any) => (
            <MangaCard key={item.id} item={item}  />
      ))
      }
      </div>
    </div>
  );
}
