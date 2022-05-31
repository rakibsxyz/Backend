import { ForbiddenException, Injectable } from "@nestjs/common";
import { Bookmark, User } from '@prisma/client'
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }
    login() {
        return { msg: 'I am in login' }
    }

    async signUp(dto: AuthDto) {

        const hash = await argon.hash(dto.password);

        try {


            const user = await this.prisma.user.create({
                data: {
                    email: dto.email, hash: hash, lastName: "lol",
                    firstName: "lolo"
                },
                // select:{
                //     email: true,
                //     lastName: true
                // }
            }
            )

            delete user.hash
            return user
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException(
                    "Credentials taken man!"
                );
            }
            throw error
        }
    }


}