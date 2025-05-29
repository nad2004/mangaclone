import express from 'express';
import { StoryController } from '../controllers/story.controller';
import { Story } from '../models/story.model';
const storyRoutes = express.Router();
const storyController = new StoryController(Story as any);
// Define user routes
storyRoutes.get('', storyController.getAll);
storyRoutes.get('/:id', storyController.getOne);


export default storyRoutes;
