import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateFromEmail } from 'unique-username-generator';
import { InjectModel } from '@nestjs/azure-database';
import { Container } from '@azure/cosmos';
import { RegisterUserDto } from 'proto/auth/login';
import { User } from 'dto/user/user.entity';
import { IUser } from './auth-user.dto';
@Injectable()
export class AppAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private readonly userRepository: Container,
  ) {}

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    const usrObj = userExists[0];

    return this.generateJwt({
      sub: usrObj.id,
      email: usrObj.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const { resource } = await this.userRepository.items.create(user);
      const userName = generateFromEmail(user.email, 5);

      return this.generateJwt({
        sub: userName,
        email: resource.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email) {
    console.log(email);
    const sqlQuery = `select * from auth_history where email=${email}`;
    const consmosResults = await this.userRepository?.items
      ?.query<User>(sqlQuery)
      .fetchAll();

    const fanal = consmosResults.resources.map<IUser>((value) => {
      return {
        id: value.id,
        userId: value.userId,
        userName: value.username,
        email: value.email,
        picture: value.picture,
      };
    });

    return fanal;
  }
}
