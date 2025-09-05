import { Body, Controller, Delete, Get, HttpCode, 
    HttpStatus, Param, ParseIntPipe,
     ParseUUIDPipe, Patch, Post, Query, Req, Res, 
     UseGuards, 
     UsePipes, 
     ValidationPipe} from "@nestjs/common";
import type { Request } from "express";
import { createUserData } from "./dtos/createUser.dtos";
import { UpdateUserData } from "./dtos/update-user.dto";
import { UserEntity } from "./user.entity";
import {v4 as uuid} from "uuid"
import { CustomValidationPipe } from "./pipe/validation.pipe";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/guards/roles.guard";


@UseGuards(AuthGuard("jwt"),RolesGuard)
@Controller("user")
// controller actions 
export default class UserController{
    constructor(private readonly userService:UserService){}


    @Get()
    async find(@Query("username") username?: string) {
    const users = await this.userService.findUsers();
    if (username) {
        return users.filter((user) => user.username === username);
    }
    return users;
    }

    @Get(":id")
    async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id);
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