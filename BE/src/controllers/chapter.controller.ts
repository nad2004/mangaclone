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
    getChapterDetailByNumber: RequestHandler = async (req, res) => {
        const { storyId, chapterNumber } = req.params;
        try {
            const chapter = await this.chapterModel.findOne({ story_id: storyId, chapter_number: chapterNumber });
            if (!chapter) {
                res.status(404).json({ message: 'Chapter not found' });
                return ;
            }
            res.json(chapter);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching chapter details', error });
        }
    }
    getLastChapterByStoryId: RequestHandler = async (req, res) => {
        const { storyId } = req.params;
        try {
            const lastChapter = await this.chapterModel.findOne({ story_id: storyId }).sort({ chapter_number: -1 });
            if (!lastChapter) {
                res.status(404).json({ message: 'No chapters found for this story' });
                return ;
            }
            res.json(lastChapter);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching last chapter', error });
        }
    }
    getFirstChapterByStoryId: RequestHandler = async (req, res) => {
        const { storyId } = req.params;
        try {
            const firstChapter = await this.chapterModel.findOne({ story_id: storyId }).sort({ chapter_number: 1 });
            if (!firstChapter) {
                res.status(404).json({ message: 'No chapters found for this story' });
                return ;
            }
            res.json(firstChapter);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching first chapter', error });
        }
    }
}   
