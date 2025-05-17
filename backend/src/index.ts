require("dotenv").config();
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import {basePrompt as nodeBasePrompt} from "./DefaultPromts/node";
import {basePrompt as reactBasePrompt} from "./DefaultPromts/react";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json())

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


  app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config:{
        systemInstruction: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
      }

    })
    console.log(response.text==="react\n")

    
    if (response.text === "react\n") {
      // console.log("hey")
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        })
        return;
    }

    if (response.text === "node\n") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        })
        return;
    }

    res.status(403).json({message: "You cant access this"})
    return;

})



app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: messages,
    config:{
      systemInstruction: getSystemPrompt()
    }

  })
  // for await (const chunk of response) {
  //   console.log(chunk.text);
  // }


  res.json({
      response: response
  });
})




app.get("/" , (req , res)=>{
  res.json("hi there")
})

app.listen(8080);