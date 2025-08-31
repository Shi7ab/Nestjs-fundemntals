import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UpdateUserData } from "./dtos/update-user.dto";
import { createUserData } from "./dtos/createUser.dtos";
import {v4 as uuid} from "uuid"

@Injectable()
export class UserService{
     private  readonly users:UserEntity[] = [];

    findUsers(): UserEntity[]{
        return this.users
    }

    findUserById(id: string): UserEntity {
         const user : UserEntity = this.users.find((user)=>user.id === id)
        return user
    }

    createUser(createUserDto: createUserData): UserEntity{
         const newuser :UserEntity = {
            ...createUserDto,
             id:uuid(),

        }
        this.users.push(newuser) 

        return newuser
    }

    updateUser(id: string, user:UpdateUserData): UserEntity {
               // 1) find the elemnt index want to update
        const index = this.users.findIndex((user)=>user.id === id)
      // 2) update this elemnt
        this.users[index] = {...this.users[index] , ...user}
        
        return this.users[index] 

    }

    deleteUser(id: string) {
         const index = this.users.findIndex((user)=>user.id === id) 
         this.users.splice(index, 1)
         return "user delete"
    }
      // another solution 
   /* delete (@Param("id") id:string){   // 5-
          this.users.filter((user)=>user.id == id)
         return "user delete"
         
    }*/
}