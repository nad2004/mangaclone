import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useFetchOne } from "@/components/hooks/useFetchOne"; 
interface ChapterReaderProps {
  images: string[];
  onPrev: () => void;
  onNext: () => void;
}

const ChapterReader = ({ images, onPrev, onNext }: ChapterReaderProps) => {
    const [isTop, setIsTop] = useState(true);
    const { storyId, chapterId } = useParams<{ storyId: string; chapterId: string }>();
    const { data: chapterDetail, isLoading: isLoadingChapter } = useFetchOne(chapterId!, 'chapters');
    useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
   if (chapterDetail === undefined || isLoadingChapter) {
    return <div>Loading...</div>;
  }
  if (!chapterDetail  ) {
    return <div>Error loading manga details or chapters.</div>;
  }
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center px-2 py-6">
        {chapterDetail.content.map((src: any, i) => (
          <img
            key={i}
            src={src}
            alt={`Page ${i + 1}`}
            className="max-w-full rounded shadow-lg"
            loading="lazy"
          />
        ))}
      </div>

      <div className="flex justify-center gap-6 py-8">
        <Button variant="contained" color="primary" onClick={onPrev}>
          Chương trước
        </Button>
        <Button variant="contained" color="primary" onClick={onNext}>
          Chương sau
        </Button>
      </div>

      {/* Nút scroll lên đầu (tuỳ chọn) */}
      {!isTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={classNames(
            "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          )}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ChapterReader;
