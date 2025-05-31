
import { Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import MangaDetail from '@/pages/story/MangaDetail';
import ChapterReader from '@/pages/chapter/ChapterReader';
const publicRoutes = [
  <Route key="home" path="/" element={<HomePage />} />,
  <Route key="" path="/manga/:storyId" element={<MangaDetail />} />, 
 <Route key="" path="/manga/:storyId/:chapterNumber" element={<ChapterReader />} />, 
];

export default publicRoutes;