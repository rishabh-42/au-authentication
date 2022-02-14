'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const PostSchema = new Schema({
    content: { type: String, required: true, trim: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema, 'posts');
