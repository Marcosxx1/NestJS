import { Post, BadRequestException, Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './input/create.user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    console.log(createUserDto);

    if (createUserDto.password !== createUserDto.retypePassword) {
      throw new BadRequestException(['Passwords do not match']); //Erros são retornados como um array []
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new BadRequestException(['Username or email already exists']);
    }

    user.username = createUserDto.username;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }
}
