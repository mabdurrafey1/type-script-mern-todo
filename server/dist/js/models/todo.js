"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Todo", todoSchema);
