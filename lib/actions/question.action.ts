"use server"

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

import { connectToDatabase } from "../mongoose"
import { revalidatePath } from "next/cache"
import { CreateQuestionParams } from "./shared.types";
import User from "@/database/user.model";


export async function getQuestion() {

    //! User Params
    try {
        connectToDatabase()
        const questions = await Question.find({})
            .populate({ path: 'tags', model: Tag })
            .populate({ path: 'author', model: User })

        return { questions };

    } catch (error) {
        console.log(error);

    }
}

export async function createQuestion(params: CreateQuestionParams) {

    try {
        connectToDatabase()
        const { title, content, tags, author, path } = params;

        // Create the question
        const question = await Question.create({
            title,
            content,
            author
        });

        const tagDocuments = [];

        // Create the tags or get them if they already exist
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                { $setOnInsert: { name: tag }, $push: { questions: question._id } },
                { upsert: true, new: true }
            )

            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } }
        });

        revalidatePath(path)


    } catch (error) {
        console.log(error);

    }
}


