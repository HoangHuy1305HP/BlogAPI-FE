import type { Tag } from "./Tag";
export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  likesCount: number;
  published: boolean;
  authorId: string;
  author: {
    id: string;
    name: string;
    bio:string
  };
  categoryId: string | null;
  category: {
    id: string;
    name: string;
  } | null;
  _count: {
    comments: number;
    like:number;
  };
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  tags: Tag[]
};

export type CreatePostPayload = {
  title:string,
  slug:string,
  content:string,
  published:boolean,
  categoryId:string,
  tagIds:string[],
  coverImage?:string;
}

export type RecentPost = {
  id:string,
  title:string,
  createAt:string,
  tags: {
    id:string,
    name:string
  }[]
}
export type UpdatePostPayload = {
  title:string,
  slug:string,
  content:string,
  published:boolean,
  categoryId:string,
  tagIds:string[],
  coverImage?:string;
}

export type PostResult = {
  posts:Post[],
  total:number
}