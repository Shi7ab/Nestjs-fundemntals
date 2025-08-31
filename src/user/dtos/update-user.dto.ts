import {PartialType} from "@nestjs/mapped-types"
import { createUserData } from "./createUser.dtos";

export class UpdateUserData extends PartialType(createUserData){
 
}