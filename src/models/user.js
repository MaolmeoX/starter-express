const mongoose = require('mongoose');
      jwt = require('jsonwebtoken');
      secret = require('../utils/secrets').secret;
      bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
    firstName: String,
    dateOfBirth: String,
  }, { timestamps: true });
  
  UserSchema.pre("save", async function(next) {
    await this.hashPassword();
    next();
  });
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };
 
  UserSchema.methods.hashPassword = async function hashPassword() {
    this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS);
  };
  
  UserSchema.methods.createToken = async function createToken() {
    const expiresIn = "7d";
    return jwt.sign(
        {
          id: this.id,
          email: this.email,
        },
        {key :privateKey, passphrase: KEY_PASSPHRASE},
        {
        algorithm: "RS256",
        expiresIn,
        },
    );
  };

  const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = {
    UserModel, 
}