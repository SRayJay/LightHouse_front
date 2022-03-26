export type Book = {
    _id:string,
    name:string,
    author:{name:string,country:string,intro:string,_id:string},
    publisher:string,
    producer:string,
    intro:string,
    cover:string,
    ISBN:string,
    publishTime:string,
    translator:string,
    series:string,
    rate:number,
    reviews:[{_id:string,text:string,title:string,content:string,likes:Array<string>}],
    wantRead:[],
    reading:[],
    haveRead:[]
}
export type Author = {
    name:string,
    country:string,
    intro:string,
    _id:string,
    nobel:number,
    photo:string,
    birthday:string,
    deathday:string,
    books:Array<Book>
}
export type User = {
    userName:string,
    avatar:string,
    background:string,
    signature:string,
    city:string,
    gender:number,
    province:string
}

export type Review = {
    _id:string,
    title:string,
    content:string,
    text:string,
    publish_time:string,
    related_book:{_id:string,name:string,cover:string,intro:string,author:{_id:string,name:string}},
    likes:Array<string>,
    comments:Array<string>,
    writer:{_id:string,userName:string,avatar:string,signature:string},
}
export type Moment = {
    _id:string,
    content:string,
    creator:string,
    create_time:string,
    replys:Array<string>,
    likes:Array<string>,
    pics:Array<string>,
    isLike?:boolean
}