import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdateUserDto) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async findByPhoneOrEmail(input: string) {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: input,
                    },
                    {
                        phone: input,
                    },
                ],
            },
        });
    }


    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({ data });
    }

    // findAll hides the password field from the response
    async findAll(skip = 0, take = 10, orderBy: any = { createdAt: 'desc' }) {
        const [users, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                skip,
                take,
                orderBy,
                select: {
                    id: true,
                    email: true,
                    firstname: true,
                    middlename: true,
                    surname: true,
                    phone: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.user.count(),
        ]);

        return { total, users };
    }
}
