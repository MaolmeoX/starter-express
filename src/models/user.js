import { Schema, model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import { jwtSecret } from '../utils/secrets';

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    name: String,
    firstName: String,
    dateOfBirth: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function(next) {
  await this.hashPassword();
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return compare(candidatePassword, this.password);
};

UserSchema.methods.hashPassword = async function hashPassword() {
  this.password = await hash(this.password, +process.env.SALT_ROUNDS);
};

UserSchema.methods.createToken = async function createToken() {
  const expiresIn = '7d';
  return sign(
    {
      id: this.id,
      email: this.email,
    },
    jwtSecret,
    {
      algorithm: 'RS256',
      expiresIn,
    }
  );
};

const UserModel = model('UserModel', UserSchema);

export default UserModel;
