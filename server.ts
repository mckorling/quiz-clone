// back end stuff
// npm i express axios nodemon
import axios, { AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'
import { QuizData } from './interfaces'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = 8000
const app = express()

app.get("/quiz-item",async (req: Request, res: Response) => {
    try {
        const response: AxiosResponse = await axios.get("https://a69d163f-b956-401f-aca6-2d1e8d3d0ccd-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/quizes/collections/quirky_quizes", {
            headers: {
                "X-Cassandra-Token": process.env.TOKEN,
                "accept": "application/json"
            }
        })
        if (response.status === 200) {
            const quizItem: QuizData = await response.data.data["19e4b838-9de1-4f31-bc55-d92827f9e8e8"]
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
            res.send(quizItem)
        }
    } catch (err) {
        console.log(err)
    } 
})

app.listen(PORT, () => {console.log('server is running on port: ' + PORT)})
