import { useFetchListChapter } from "@/components/hooks/useFetchListChapter";
import type { IStory } from "@/types/story";
import { useNavigate } from "react-router-dom";
interface MangaRowProps {
  manga: IStory;
}

export const MangaRow = ({ manga }: MangaRowProps) => {
  const { data: chapters, isLoading, isError } = useFetchListChapter(manga._id);
    const navigate = useNavigate();
  return (
    <tr className="border-b border-gray-200 dark:border-gray-500">
      <td className="px-4 py-3 max-w-[50px]">
        <img src={manga.cover_image} alt="" />
      </td>
      <td className="px-4 py-3">{manga.title}</td>
      <td className="px-4 py-3">{manga.author}</td>
      <td className="px-4 py-3">
        {isLoading ? "Đang tải..." : isError ? "Lỗi" : chapters?.length ?? 0}
      </td>
      <td className="px-4 py-3">
        {isLoading
          ? "Đang tải..."
          : isError
          ? "Lỗi"
          : chapters && chapters.length > 0
          ? chapters[0].title
          : "Chương 0"}
      </td>
        <td className="px-4 py-3">
            <span
            className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                manga.status === "ongoing"
                ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white"
                : "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white"
            }`}
            >
            {manga.status === "ongoing" ? "Đang tiến hành" : "Đã hoàn thành"}
            </span>
        </td>
      <td className="px-4 py-3 text-center space-x-2">
        <button className="text-blue-600 hover:underline" onClick={()=> navigate(`/admin/manga/edit/${manga._id}`, { state: { manga } })}>Sửa</button>
        <button className="text-red-600 hover:underline">Xoá</button>
      </td>
    </tr>
  );
};
