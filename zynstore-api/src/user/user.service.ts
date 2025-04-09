import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {


  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  //function to signup
  
  async signup(dto: CreateUserDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const newUser = new this.userModel({ email: dto.email, password: hashed });
    return newUser.save();
  }


  //function to login
  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Wrong password');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { access_token: token };
  }
}