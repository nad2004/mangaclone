import { BaseController } from './base.controller';
import { Model } from 'mongoose';
import { IView } from '../models/view.model';

export class ViewController extends BaseController<IView> {
    constructor(private viewModel: Model<IView>) {
        super(viewModel);
    }
}
