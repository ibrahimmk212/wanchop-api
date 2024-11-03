import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { UsersRepository } from './repositories';
import { CreateUserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(private readonly usersRepository: UsersRepository) { }

    async createUser(data: CreateUserDto) {
        const existingUser = await this.usersRepository.findByEmail(data.email);
        this.logger.log(existingUser); // Log the existing user
        if (existingUser) throw new BadRequestException('Email already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.usersRepository.createUser({ ...data, password: hashedPassword });
    }

    async updateUser(id: number, data: any) {
        return this.usersRepository.update(id, data);
    }

    async findUserByEmailOrPhone(input: string) {
        return this.usersRepository.findByPhoneOrEmail(input);
    }

    async findUserById(id: number) {
        return this.usersRepository.findById(id);
    }

    async getAllUsers(skip: number, take: number, orderBy: any) {
        return this.usersRepository.findAll(skip, take, orderBy);
    }
}
