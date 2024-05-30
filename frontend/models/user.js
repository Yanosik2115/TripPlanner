import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: [true, 'Username already exists!'],
    // match: [
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    //   'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    // ],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    select: false,
  },
  image: {
    type: String,
  },
});

const User = models.User || model('User', UserSchema);
export default User;
