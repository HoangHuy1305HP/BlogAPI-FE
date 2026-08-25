import type {User} from "./User";
export type Category = {
  id: string;
  name: string;
  postId:string,
  authorId:string,
  author:User,
  createdAt:string
};