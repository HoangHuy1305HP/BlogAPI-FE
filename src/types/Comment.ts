export type Comment = {
    id:string,
    content:string,
    postId: string;
    authorId: string;
    createdAt: string;
    author: {
        id: string;
        name: string;
    }
}