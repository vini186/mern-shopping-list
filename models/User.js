const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create ItemSchema
const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
    Register_date: {
      type: Date,
      default: Date.now
    }
  });


 module.exports = User = mongoose.model('user', UserSchema);