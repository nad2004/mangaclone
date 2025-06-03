import { Button } from "@mui/material";
import useFetchAll from "@/components/hooks/useFetchAll";
import type { IStory } from "@/types/story";
import { MangaRow } from "@/pages/admin/component/MangaRow"; // đường dẫn đúng

export default function MangaPage() {
  const { data: mangas, isLoading, isError, error } = useFetchAll("/stories");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý truyện</h1>
      <div className="mb-4">
        <Button variant="contained" color="primary">
          Thêm truyện
        </Button>
      </div>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th className="px-4 py-3 font-medium"></th>
              <th className="px-4 py-3 font-medium">Tên Truyện</th>
              <th className="px-4 py-3 font-medium">Tác Giả</th>
              <th className="px-4 py-3 font-medium">Tổng Số Chương</th>
              <th className="px-4 py-3 font-medium">Chương Mới Nhất</th>
              <th className="px-4 py-3 font-medium">Trạng Thái</th>
              <th className="px-4 py-3 font-medium text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {mangas.map((manga: IStory) => (
              <MangaRow key={manga._id} manga={manga} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
