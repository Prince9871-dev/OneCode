export interface User{
    id:string;
    name:string | null;
    image:string | null;
    role:string;
    createdAt:Date;
    updatedAt:Date;
}

export interface Project{
    id:string;
    title:string;
    description:string | null;
    template:string;
    createdAt:Date;
    user:User;
    userId:string;
    StarMark?:{isMarked:boolean}[]
}