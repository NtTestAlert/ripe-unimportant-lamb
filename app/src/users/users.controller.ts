import { BadRequestException, Controller, Get, ValidationPipe } from "@nestjs/common";
import { Ctx, MessagePattern, Payload, RedisContext } from "@nestjs/microservices";
import { CreateUserDto } from "./create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Service endpoints

  @MessagePattern('create-user')
  async getNotifications(@Payload(new ValidationPipe()) data: CreateUserDto, @Ctx() context: RedisContext) {
    //console.log(`Channel: ${context.getChannel()}, Data : ${data}`);
    return await this.usersService.createUser(data);
  }

  // HTTP endpoints

  @Get()
  getMain(): string {
    return 'Server is running. Did you mean /users ?';
  }

  @Get('/users')
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
