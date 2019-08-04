import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserRo } from '../user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ){}

    async showAll(): Promise<UserRo[]> {
        const users = await this.userRepository.find();
        return users.map( user => user.toResponseObject(false));
    }

    async login(data: UserDTO): Promise<UserRo> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where : username});
        if (!user || (await user.comparePassword(password))) {
            throw new HttpException(
                'invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO){
        const { username } = data;
        const user = await this.userRepository.findOne({ where : username});
        if (!user) {
            throw new HttpException(
                'User already Exists',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

}
