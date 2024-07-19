import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";

// create a new chat
export const createChat = asyncHandler((req, res) => {
    try {
        const { userId, content } = req.body;
        const title = "New Chat";

        User.findById(userId)
            .then(() => {
                const newChat = new Chat({ title, content, userId });
                newChat
                    .save()
                    .then((chat) =>
                        res.status(201)
                            .json(new ApiResponse(201, chat, "chat created successfully")))
                    .catch((error) =>
                        res.status(501)
                            .json(new ApiResponse(501, error.message, "chat not created!")));
            })
            .catch((error) => res.status(404).json(new ApiResponse(404, error.message, "Invalid request")));
    } catch (error) {
        console.log("Error creating chat: ", error.message);
        res.status(501)
            .json(new ApiResponse(501, error.message, "chat not started due to unhandled trouble!"))
    }
})

// update chat title
export const updateChatTitle = asyncHandler((req, res) => {
    try {
        const { title } = req.body;
        const id = req.params.id;

        Chat
            .findByIdAndUpdate(
                id,
                { title: title },
                { new: true })
            .then((chat) =>
                res.status(200)
                    .json(new ApiResponse(200, chat.title, "title updated successfully")))
            .catch((error) =>
                res.status(501)
                    .json(new ApiResponse(501, error.message, "title not updated")));

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(501)
            .json(new ApiResponse(501, error.message, "chat title not updated"))
    }
})

// update chat contents
export const updateChat = asyncHandler((req, res) => {
    try {
        const cid = req.params.cid;

        Chat
            .findByIdAndUpdate(
                cid,
                { $push: { content: req.body } },
                { new: true })
            .then((chat) =>
                res.status(200)
                    .json(new ApiResponse(200, chat.content, "chat updated successfully")))
            .catch((error) =>
                res.status(501)
                    .json(new ApiResponse(501, error.message, "chat not found and not updated")));

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(501)
            .json(new ApiResponse(501, error.message, "chat content not updated"))
    }
})

// get a chat by cid
export const getChatById = asyncHandler((req, res) => {
    try {
        const cid = req.params.cid;

        Chat
            .findById(cid)
            .select('-userId')
            .then((chat) =>
                res.status(200)
                    .json(new ApiResponse(200, chat, "chat found")))
            .catch((error) =>
                res.status(404)
                    .json(new ApiResponse(404, error.message, "chat not found")));

    } catch (error) {
        console.log("Error: ", error.message);
    }
})

// filter chat by user id
export const filterChatByUserId = asyncHandler((req, res) => {
    try {
        const uid = req.params.uid;

        User
            .findById(uid)
            .then((user) => {
                Chat
                    .find({ userId: uid })
                    .select('-userId')
                    .then((chat) =>
                        res.status(200)
                            .json(new ApiResponse(200, chat, "all matched chats fetched")))
                    .catch((error) =>
                        res.status(404)
                            .json(new ApiResponse(404, error.message, "No matches found")));
            })
            .catch((error) =>
                res.status(404)
                    .json(new ApiResponse(404, error.message, "User not found")));

    } catch (error) {
        console.log("Error: ", error);
    }
})

export const deleteChatById = asyncHandler((req, res) => {
    try {
        const cid = req.params.cid;

        Chat
            .find({ _id: cid })
            .then((chat) => {
                if (chat.length === 0) {
                    res.status(404)
                        .json(new ApiResponse(404, "Chat is not exist!", "Invalid Chat ID"))
                } else {
                    Chat
                        .deleteOne({ _id: cid })
                        .then(() =>
                            res.status(200)
                                .json(new ApiResponse(200, "OK", "Chat deleted"))
                        )
                        .catch((error) =>
                            res.status(404)
                                .json(new ApiResponse(404, error.message, "Chat Not Deleted")))
                }

            })
            .catch((error) =>
                res.status(404)
                    .json(new ApiResponse(404, error.message, "Invalid request from client")));


    } catch (error) {
        console.log("Error: ", error.message);
    }
})