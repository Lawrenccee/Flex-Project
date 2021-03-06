import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(v);
      },
      message: 'Valid email address is required'
    },
    unique: [true, "This email has been taken"],
    index: [true, "This email has been taken"],
    lowercase: true,
    required: [true, "Valid email address is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: [true, "Date of birth is required"]
  },
  stage: String,
  log: [{
    type: Schema.Types.ObjectId,
    ref: 'LogEntry'
  }],
  dates: {},
  medications: [String],
  doc_email: String,
  license: String,
  hospital: String,
  nextAppt: Number,
  inDanger: {
    type: Boolean,
    default: false
  },
  patients: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
  timestamps: true,
  minimize: false
}
);

// UserSchema.pre('save', function(next) {
//
//   const user = this,
//         SALT_FACTOR = 15;
//
//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });


UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('User', UserSchema);
