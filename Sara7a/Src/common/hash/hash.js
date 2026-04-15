import bcrypt, { hash } from "bcrypt"
import { env } from "../../../Config/index.js";
import e from "express";

export const generateHash = async (plaintext) => {
    const hashpassword = await hash(plaintext, +env.salt);
    return hashpassword;
}

export const compareHash = async (plaintext, hash) => {
    const isMatched = await bcrypt.compare(plaintext, hash);
    return isMatched;
}