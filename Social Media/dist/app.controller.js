import express from "express";
export const Bootstrap = () => {
    const app = express();
    app.listen("3000", () => {
        console.log("server is running on port 3000");
    });
};
