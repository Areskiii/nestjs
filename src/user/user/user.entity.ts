import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert } from 'typeorm';
import { create } from 'istanbul-reports';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRo } from '../user.dto';
@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created: Date;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true): UserRo {
        const { id, created, username, token} = this;
        const responseObject = { id, created, username, token};
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }

    async comparePassword(attempt: string){
        return await bcrypt.compare( attempt, this.password);
    }

    private get token(){
        const {id, username} = this;
        return jwt.sign({
            id,
            username,
        }, process.env.SECRET,
        {expiresIn: '7d'},
        )
    }
}