import { BaseController } from './base.controller';
import { Model } from 'mongoose';
import { ICategory } from '../models/category.model';

export class CategoryController extends BaseController<ICategory> {
    constructor(private categoryModel: Model<ICategory>) {
        super(categoryModel);
    }
}
