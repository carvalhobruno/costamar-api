import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    const passwordsMatch = await compare(password, user?.password);

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      email,
    });

    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const salt = await genSalt(10);
    const user = new User();
    user.email = email;
    user.password = await hash(password, salt);

    return this.usersRepository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }
}
