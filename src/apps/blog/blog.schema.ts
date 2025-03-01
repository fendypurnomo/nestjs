import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({required: true, index: true, trim: true})
  title!: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  })
  slug!: string;

  @Prop({required: false, default: 'Blog'})
  category?: string;

  @Prop({required: true, default: false})
  published!: boolean;

  @Prop({required: true})
  author!: string;

  @Prop()
  user!: string;

  @Prop({default: ''})
  image?: string;

  @Prop({required: true, trim: true})
  content!: string;

  @Prop([String, {default: []}])
  tags?: string[];

  @Prop({default: false})
  headline!: boolean;

  @Prop({default: 0})
  read?: number;

  @Prop({required: true, default: Date.now})
  created_at!: Date;

  @Prop({required: true, default: Date.now})
  updated_at!: Date;

  @Prop([String])
  comments?: [{user: string; content: string; created_at: Date}] | null;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);