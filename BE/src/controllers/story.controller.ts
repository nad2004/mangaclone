import { BaseController } from './base.controller';
import { IStory } from '../models/story.model';
import { Model } from 'mongoose';

export class StoryController extends BaseController<IStory> {
    constructor(private storyModel: Model<IStory>) {
        super(storyModel);
    }
}
