import { Request, RequestHandler, Response } from 'express';
import { Model, Document  } from 'mongoose';

export class BaseController<T extends Document> {
  constructor(private model: Model<T >) {}

  createOne: RequestHandler = async (req, res) => {
    try {
      const doc = await this.model.create(req.body);
      res.status(201).json(doc);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getAll: RequestHandler = async (req, res) => {
    try {
      const docs = await this.model.find().lean();
      res.json(docs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getOne: RequestHandler = async (req, res) => {
    try {
      const doc = await this.model.findById(req.params.id);
      if (!doc) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.json(doc);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

   updateOne: RequestHandler = async (req, res) => {
    try {
      const doc = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.json(doc);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteOne: RequestHandler = async (req: Request, res: Response) => {
    try {
      const doc = await this.model.findByIdAndDelete(req.params.id);
      if (!doc) {
        res.status(404).json({ message: 'Not found' });
      } else {
        res.json({ message: 'Deleted successfully' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    
  };
}
