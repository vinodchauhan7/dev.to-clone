import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  postId: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [String])
  @Column("simple-array")
  tags: string[];

  @Field()
  @Column()
  creationDate: string;

  @Field()
  @Column("int")
  views: number;

  @Field()
  @Column()
  isPublished: boolean;

  @ManyToOne(() => User, user => user.posts)
  @Field(() => User)
  user: User;
}
