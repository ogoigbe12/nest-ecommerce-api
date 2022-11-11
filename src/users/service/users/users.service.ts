import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUseDto } from 'src/users/dto/user.dto';
import { User, UserDocument } from 'src/users/schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async createUser(userDetails: CreateUseDto) {
    const findEmail = await this.userModel.findOne({
      email: userDetails.email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    userDetails.password = hashedPassword;
    if (!findEmail) {
      const userToSave = new this.userModel(userDetails);
      return await userToSave.save();
    }
  }
  async login(userDetails: CreateUseDto) {
    const userLogin = await this.userModel.findOne({
      email: userDetails.email,
    });
    console.log(userLogin);
    if (userLogin) {
      const passwordCheck = await bcrypt.compare(
        userDetails.password,
        userLogin.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: userLogin.id,
          email: userLogin.email,
        });
        return { token: token };
      }
      return { err: 'incorrect password', status: HttpStatus.BAD_REQUEST };
    }
    return { err: 'user with email not found', status: HttpStatus.NOT_FOUND };
  }
}
