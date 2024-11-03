import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ description: 'User email address' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', minLength: 6 })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'First name of the user' })
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({ description: 'Middle name of the user' })
    @IsNotEmpty()
    middlename: string;

    @ApiProperty({ description: 'Surname of the user' })
    @IsNotEmpty()
    surname: string;

    @ApiProperty({ description: 'Phone number of the user' })
    @IsNotEmpty()
    phone: string;
}


export class LoginDto {
    @ApiProperty({ description: 'User email address' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password' })
    @IsNotEmpty()
    password: string;
}