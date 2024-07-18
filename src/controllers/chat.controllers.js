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
                    .then((chat) => res.status(201).json(new ApiResponse(201, chat, "chat created successfully")))
                    .catch((error) => res.status(501).json(new ApiResponse(501, error.message, "chat not created!")));
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
    console.log("Updating chat title");
    try {
        const { chatTitle } = req.body;
        const id = req.params.id;
        console.log(chatTitle);
        Chat
            .findByIdAndUpdate(id, { title: chatTitle }, { new: true })
            .then((chat) => res.status(200).json(new ApiResponse(200, chat.title, "title updated successfully")))
            .catch((error) => res.status(501).json(new ApiResponse(501, error.message, "title not updated")));

    } catch (error) {
        console.log("Error: ", error.message);
        res.status(501)
            .json(new ApiResponse(501, error.message, "chat title not updated"))
    }
})