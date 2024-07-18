import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function validateEmail(email) {
    // Regular expression to check if email is valid
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
    return re.test(email);
}

export const registerUser = asyncHandler((req, res) => {
    try {
        const { name, email } = req.body;
 
        if (!name || !email) {
            res.status(400).json(new ApiResponse(400, null, "All fields are required"))
        } if (!validateEmail(email)) {
            res.status(400).json(new ApiResponse(400, null, "Email is not valid!"))
        } else {
            User.findOne({ email: email })
                .then((user) => {
                    if (user) {
                        res.status(400).json(new ApiResponse(400, null, "Account already exists!"))
                    } else {
                        const newUser = new User({ name, email })
                        newUser
                            .save()
                            .then((user) => {
                                res.status(201).json(new ApiResponse(201, user, "Account has been created and logged in"))
                            })
                            .catch((error) => {
                                console.log("\nAccount not created: ", error.message)
                                res.status(400).json(new ApiResponse(400, error.message, "Something went wrong!"))
                            })
                    }
                })
        }
    } catch (error) {
        res.status(400).json(new ApiResponse(400, null, "Something went wrong!"))
    }

})

export const getUsers = asyncHandler((req, res) => {
    User
        .find()
        .then((user) => {
            if (user.length > 0) {
                res.status(200).json(new ApiResponse(200, user, "All users fetched successfully"))
            } else {
                res.status(200).json(new ApiResponse(200, user, "No users found"))
            }
        })
        .catch((error) => res.status(400).json(new ApiResponse(400, error, "Something went wrong!")))
})