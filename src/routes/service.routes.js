import { Router } from "express";
import { getUsers, registerUser } from "../controllers/user.controllers.js";
import { createChat, deleteChatById, filterChatByUserId, getChatById, updateChat, updateChatTitle } from "../controllers/chat.controllers.js";

const router = new Router();

router.route('/api/create/user').post(registerUser);            // register user
router.route('/api/users').get(getUsers);                       // get users

router.route('/api/create/chat').post(createChat);              // create chat
router.route('/api/c/title/:id').put(updateChatTitle);          // update chat title
router.route('/api/c/:cid').put(updateChat);                    // update chat
router.route('/api/c/:cid').get(getChatById);                   // get chat
router.route('/api/c/private/:uid').get(filterChatByUserId)     // filter chat by user
router.route('/api/c/:cid').delete(deleteChatById);                // delete chat


export default router;