const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: { type: String, required: true, trim: true, index: true },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student']
    },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password);
    next();
});

UserSchema.methods.comparePassword = function (password) {
    console.log(password, this.password)
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('users', UserSchema, 'users');
