import { Router } from "express";
import { getUsers, registerUser } from "../controllers/user.controllers.js";
import { createChat, updateChatTitle } from "../controllers/chat.controllers.js";

const router = new Router();

router.route('/api/v1/create/user').post(registerUser);
router.route('/api/v1/users').get(getUsers);

export default router;