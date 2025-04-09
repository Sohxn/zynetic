import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {

  //these are basically all the attributes of the entity book 

  @Prop() 
  title: string;
  
  @Prop() 
  author: string;
  
  @Prop() 
  category: string;
  
  @Prop() 
  price: number;
  
  @Prop() 
  rating: number;
  
  @Prop() 
  publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);