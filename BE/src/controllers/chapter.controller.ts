import { BaseController } from './base.controller';
import { Model } from 'mongoose';
import { IChapter } from '../models/chapter.model';
import { getChaptersByStoryId } from '../services/chapter.service';
import { RequestHandler } from 'express';
export class ChapterController extends BaseController<IChapter> {
    constructor(private chapterModel: Model<IChapter>) {
        super(chapterModel);
    }
    getChaptersByStoryId: RequestHandler = async (req, res) => {
        const { storyId } = req.params;
        const chapters = await getChaptersByStoryId(storyId);
        res.json(chapters);
    }
}   
