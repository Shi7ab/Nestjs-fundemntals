import { PartialType } from "@nestjs/mapped-types";
import { createpostDto } from "./createpost.dto";


export class updatepostDto extends PartialType(createpostDto){}