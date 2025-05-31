import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchChapter } from "@/components/hooks/useFetchChapterByNum";
import { fetchLastChapter, fetchFirstChapter } from "./FetchMaxMinChapter";

const ChapterReader = () => {
  const navigate = useNavigate();
  const [isTop, setIsTop] = useState(true);
  const [firstChapterNumber, setFirstChapterNumber] = useState<number | null>(null);
  const [lastChapterNumber, setLastChapterNumber] = useState<number | null>(null);

  const { storyId, chapterNumber } = useParams<{ storyId: string; chapterNumber: string }>();
  const chapterNum = Number(chapterNumber);
  const { data: chapterDetail, isLoading: isLoadingChapter } = useFetchChapter(storyId!, chapterNum);

  // Lấy chương đầu và chương cuối
  useEffect(() => {
    const fetchData = async () => {
      const [first, last] = await Promise.all([
        fetchFirstChapter(storyId!),
        fetchLastChapter(storyId!)
      ]);
      setFirstChapterNumber(first.chapter_number);
      setLastChapterNumber(last.chapter_number);
    };
    fetchData();
  }, [storyId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [storyId, chapterNumber]);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onPrev = () => {
    if (firstChapterNumber !== null && chapterNum > firstChapterNumber) {
      navigate(`/manga/${storyId}/${chapterNum - 1}`);
    }
  };

  const onNext = () => {
    if (lastChapterNumber !== null && chapterNum < lastChapterNumber) {
      navigate(`/manga/${storyId}/${chapterNum + 1}`);
    }
  };

  if (chapterDetail === undefined || isLoadingChapter || firstChapterNumber === null || lastChapterNumber === null) {
    return <div>Loading...</div>;
  }

  if (!chapterDetail) {
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
        <Button
          variant="contained"
          color="primary"
          onClick={onPrev}
          disabled={chapterNum === firstChapterNumber}
        >
          Chương trước
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={chapterNum === lastChapterNumber}
        >
          Chương sau
        </Button>
      </div>

      {!isTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ChapterReader;
