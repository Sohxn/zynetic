import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './books.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(dto) {
    const book = new this.bookModel(dto);
    return book.save();
  }

  async findAll(query) {
    const filter = {};
    if (query.author) filter['author'] = query.author;
    if (query.category) filter['category'] = query.category;
    if (query.rating) filter['rating'] = { $gte: +query.rating };
    if (query.title) filter['title'] = { $regex: query.title, $options: 'i' };

    return this.bookModel.find(filter);
  }

  async findOne(id: string) {
    return this.bookModel.findById(id);
  }

  async update(id: string, dto) {
    return this.bookModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
