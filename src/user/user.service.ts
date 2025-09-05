import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repoistory";
import { UpdateUserData } from "./dtos/update-user.dto";
import { createUserData } from "./dtos/createUser.dtos";
import bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUsers() {
    return this.userRepository.findUsers();
  }

  async findUserById(id: string) {
    return this.userRepository.findUserById(id);
  }

  async findByEmail(email: string) {
  return this.userRepository.findByEmail(email); // 👈 نفس الحاجة لازم تكون موجودة في الrepo
  }


  async createUser(createUserDto: createUserData) {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return this.userRepository.createUser(createUserDto);
  }

  async updateUser(id: string, user: UpdateUserData) {
    return this.userRepository.updateUser(id, user);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
