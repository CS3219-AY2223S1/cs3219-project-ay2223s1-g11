import HistoryModel from './history-model.js';
import 'dotenv/config';

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.CLOUD_DB_URL : process.env.LOCAL_DB_URL;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


export async function getQuestionHistory(userName) {
    return HistoryModel.find({ userName: userName }).select('title topic difficulty question lastAttempt -_id').sort({lastAttempt: -1});
}

export async function addQuestionToHistory(data) {
    var query = { userName: data.userName, title: data.title, topic: data.topic, difficulty: data.difficulty, question: data.question };
    var update = { lastAttempt: new Date() };
    var options = { upsert: true, new: true };
    // console.log(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Singapore' }))
    return HistoryModel.findOneAndUpdate(query, update, options);
}