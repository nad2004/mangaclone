import { BaseController } from './base.controller';
import { Model } from 'mongoose';
import { IComment } from '../models/comment.model';
    
export class CommentController extends BaseController<IComment> {
    constructor(private commentModel: Model<IComment>) {
        super(commentModel);
    }
}
