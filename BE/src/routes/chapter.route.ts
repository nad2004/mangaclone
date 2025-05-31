import express from 'express';
import { ChapterController } from '../controllers/chapter.controller';
import { Chapter } from '../models/chapter.model';
const chapterRoutes = express.Router();
const chapterController = new ChapterController(Chapter as any);
// Define user routes
chapterRoutes.get('', chapterController.getAll);
chapterRoutes.get('/:id', chapterController.getOne);
chapterRoutes.post('/', chapterController.createOne);
chapterRoutes.put('/:id', chapterController.updateOne);
chapterRoutes.delete('/:id', chapterController.deleteOne);
chapterRoutes.get('/story/:storyId', chapterController.getChaptersByStoryId);
chapterRoutes.get('/story/:storyId/chapter/:chapterNumber', chapterController.getChapterDetailByNumber);
chapterRoutes.get('/story/:storyId/last', chapterController.getLastChapterByStoryId);
chapterRoutes.get('/story/:storyId/first', chapterController.getFirstChapterByStoryId);
export default chapterRoutes;
