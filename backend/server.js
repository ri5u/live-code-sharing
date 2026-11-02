import WebSocket, { WebSocketServer } from "ws";
import { GoogleGenAI, Modality } from "@google/genai";

import "dotenv/config"

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY})
const model = 'gemini-3.8-live'
const config = {
    responseModalities: [Modality.AUDIO], 
    ouputAudioTranscription: {}, 
    inputAudioTranscription: {},
}

const wss = new WebSocketServer({port: 8080});
wss.on("connection", async(ws) => {
    const session = await ai.live.connect({
        model: model, 
        callbacks: {
            onopen: function() {
                console.debug("Opened!!!");
            },
            onmessage: function(message) {
                const content = message.serverContent;
                if (content?.inputTranscription){
                    console.log('User:', content.inputTranscription.text);
                }
                if (content?.outputTranscription){
                    console.log('Gemini:', content.outputTranscription.text);
                }
            },
            onerror: function(e){
                console.debug('Error', e.message);
            },
            onclose: function(e) {
                console.debug('Close:', e.reason);
            },
        },
        config: config,
    })
    console.debug("Session Started");
    ws.on('message', (message) => {
        const rawCodeText = message.toString();
        console.log("Received Text: " , rawCodeText);
        session.sendRealtimeInput({
            text: rawCodeText,
        });
    })
})