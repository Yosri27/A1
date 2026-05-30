import mongoose from "mongoose";
import { GenderEnums, ProviderEnums, RoleEnums } from "../../enums/index.js";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === ProviderEnums.System;
        },
    },
    phone: { type: String },
    gender: {
        type: String,
        enum: Object.values(GenderEnums),
        default: GenderEnums.Male
    },
    provider: {
        type: String,
        enum: Object.values(ProviderEnums),
        default: ProviderEnums.System
    },
    role: {
        type: String,
        enum: Object.values(RoleEnums),
        default: RoleEnums.User
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    }
});
userSchema.virtual('userName').set(function (value) {
    let [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
}).get(function () {
    return `${this.firstName} ${this.lastName}`;
});
userSchema.pre("validate", async function () {
    console.log("  Pre Validate");
});
userSchema.post("validate", async function () {
    console.log("Post Validatee");
    if (this.firstName.length > 5) {
        console.log("name is too short");
    }
});
export const userModel = mongoose.model("user", userSchema);
export default userModel;
