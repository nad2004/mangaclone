import { BaseController } from './base.controller';
import { Model } from 'mongoose';
import { IFavorite } from '../models/favorite.model';

export class FavoriteController extends BaseController<IFavorite> {
    constructor(private favoriteModel: Model<IFavorite>) {
        super(favoriteModel);
    }
}
