import mongoose, { Schema, Document } from "mongoose";

export interface IFlashcard extends Document {
    word: string;
    meaning: string;
    example?: string;
    image?: string;
    audio?: string;
    category?: string;
    level?: string;
    tags?: string[];
    userId: string;
    deskId:string;
    createdAt?: Date;
    updatedAt?: Date;
}

export const FlashcardSchema = new Schema({
    word: {type: String, required: true},
    meaning: {type: String, required: true},
    example: {type: String},
    image: {type: String},
    audio: {type: String},
    category: {type: String},
    level: {type: String},
    tags: {type: [String]},
    userId: {type: Schema.Types.ObjectId, required: true},
    deskId: {type: Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export default mongoose.model<IFlashcard>("Flashcard", FlashcardSchema);
