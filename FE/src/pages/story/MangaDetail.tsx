import { useState } from 'react';
import { Button, IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useFetchListChapter } from '@/components/hooks/useFetchListChapter';
import { useFetchOne } from '@/components/hooks/useFetchOne';
import { useParams, useNavigate } from 'react-router-dom';
import StoryBreadcrumb from '@/components/ui/BreadCrumb';
export default function MangaDetail() {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const { storyId } = useParams<{ storyId: string }>();
  const { data: mangaDetail, isLoading: isLoadingManga } = useFetchOne(storyId!, 'stories');
  const { data: chapters, isLoading: isLoadingChapters } = useFetchListChapter(storyId!);

  if (isLoadingManga || isLoadingChapters) {
    return <div>Loading...</div>;
  }
  if (!mangaDetail || !chapters) {
    return <div>Error loading manga details or chapters.</div>;
  }
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Title & Actions */}
      <StoryBreadcrumb currentTitle={mangaDetail.title} />
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-3xl font-bold">{mangaDetail.title}</h1>
        <div className="space-x-2">
          <IconButton color="primary">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton color="primary">
            <ShareIcon />
          </IconButton>
        </div>
      </div>

      {/* Image & Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={mangaDetail.cover_image}
          alt="Manga Cover"
          className="rounded-xl w-52 h-auto shadow-lg"
        />
        <div className="flex-1 space-y-3">
          <p><strong>Tác giả:</strong> {mangaDetail.author}</p>
          <p><strong>Thể loại:</strong> Hành động, Phiêu lưu</p>
          <p><strong>Trạng thái:</strong> {mangaDetail.status}</p>
          <p><strong>Lượt xem:</strong> 123456</p>
          <p className="text-justify">
            <strong>Mô tả:</strong> {mangaDetail.description || 'Mô tả chưa có.'}
          </p>
          <div className="flex items-center space-x-2">
            <Rating name="read-only" value={4.5} precision={0.5} readOnly />
            <span className="text-sm">(4.5/5)</span>
          </div>
          <Button
            variant="contained"
            color={isFollowing ? 'secondary' : 'primary'}
            onClick={() => setIsFollowing(prev => !prev)}
          >
            {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
          </Button>
        </div>
      </div>

      {/* Chapter list */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Danh sách chương</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {chapters.map((chapter) => (
            <li key={chapter._id}>
              <div onClick={() => {
                navigate(`/manga/${storyId}/${chapter._id}`)
              }} className="block p-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                chapter {chapter.chapter_number} 
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
