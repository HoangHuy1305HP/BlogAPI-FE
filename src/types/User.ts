export type User = {
    id:string,
    email:string,
    name:string,
    bio:string,
    createdAt?:string,
    updatedAt?:string
}

export type UserProfile = {
    id:string,
    name:string,
    bio:string,
    createdAt?: string
}