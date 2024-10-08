import { KnownModel, ollamaInference } from "../modules/ollama";
import { groqRequest } from "../modules/groq-llama3";


export async function imageDescription(src: Uint8Array, model?: KnownModel): Promise<string> {
    return ollamaInference({
        model: model || 'moondream:1.8b-v2-moondream2-text-model-f16',
        messages: [{
            role: 'system',
            content: 'You are a very advanced model and your task is to describe the image as precisely as possible. Transcribe any text you see.'
        }, {
            role: 'user',
            content: 'Describe the scene',
            images: [src],
        }]
    }); 
}

export async function llamaFind(question: string, images: string): Promise<string> {
    // return groqRequest(
    //          `
    //             You are a smart AI that need to read through description of a images and answer user's questions. 
                
    //             This are the provided images:
    //             ${images}

    //             DO NOT mention the images, scenes or descriptions in your answer, just answer the question.
    //             DO NOT try to generalize or provide possible scenarios.
    //             ONLY use the information in the description of the images to answer the question.
    //             BE concise and specific.
    //         `
    //     , 
    //         question
    // );
    return ollamaInference({
        model: 'llava-llama3',
        messages: [{
            role: 'system',
            content: `
                You are a smart AI that need to read through description of a images and answer user's questions. 
                
                This are the provided images:
                ${images}

                DO NOT mention the images, scenes or descriptions in your answer, just answer the question.
                DO NOT try to generalize or provide possible scenarios.
                ONLY use the information in the description of the images to answer the question.
                BE concise and specific.
            `        }, {
            role: 'user',
            content: question,
        }]
    }); 
}