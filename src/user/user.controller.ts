import { Body, Controller, Delete, Get, HttpCode, 
    HttpStatus, Param, ParseIntPipe,
     ParseUUIDPipe, Patch, Post, Query, Req, Res, 
     UsePipes, 
     ValidationPipe} from "@nestjs/common";
import type { Request } from "express";
import { createUserData } from "./dtos/createUser.dtos";
import { UpdateUserData } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import {v4 as uuid} from "uuid"
import { CustomValidationPipe } from "./pipe/validation.pipe";
import { UserService } from "./user.service";



@Controller("user")
// controller actions 
export default class UserController{
    constructor(private readonly userService:UserService){}

 

    @Get()  
    find(@Query("username", CustomValidationPipe) username:String):UserEntity[]{    // 1-
        return this.userService.findUsers()
    }
    

    @Get(":id")
    findOne(@Param("id", ParseUUIDPipe) id:string): UserEntity{   
        return this.userService.findUserById(id)
    }

    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() createUserDto:createUserData) {   // 3-
        return this.userService.createUser(createUserDto)
    }

    @Patch(":id")
    update(@Param("id",ParseUUIDPipe) id:string,@Body() updateUserData:UpdateUserData){    // 4-
        return this.userService.updateUser(id, updateUserData)
    }
    
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseUUIDPipe) id:string){   // 5-
        return this.userService.deleteUser(id)
         
    }

}