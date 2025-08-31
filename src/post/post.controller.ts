import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("post")
export class PostController{

    @Get("")
    find():string{
        return "get postes"
    }
    @Post("")
    create(@Body("postContent") postContent: any):string{
        return  postContent
    }
  
    @Get(":postId")
    findOne(@Param() postId:any ):string{   // 2-
        return postId
    }
}