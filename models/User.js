
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['student', 'faculty', 'admin'], 
    default: 'student' 
  },
  password_hash: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  last_login: { type: Date }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
