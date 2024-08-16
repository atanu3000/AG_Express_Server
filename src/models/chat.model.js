import mongoose, { Schema } from 'mongoose';

const chatContentSchema = new Schema(
    {
        parts: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }
    , { _id: false }
);

const chatSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: [chatContentSchema],
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
    , { timestamps: true }
);

export const Chat = mongoose.model('Chat', chatSchema);