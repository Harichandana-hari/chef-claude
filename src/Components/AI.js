// import { HfInference } from '@huggingface/inference'

// 

// const hf = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN)

// console.log("Token available:", !!process.env.REACT_APP_HF_ACCESS_TOKEN)

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ");
//     try {
//         const response = await hf.chatCompletion({
//             model: "mistralai/Mistral-7B-Instruct-v0.1", // Free alternative
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` },
//             ],
//         });
//         return response.choices[0].message.content;
//     } catch (err) {
//         console.error("API Error:", err.message);
//         return "Sorry, I couldn't fetch a recipe. Try again later!";
//     }
// }




import axios from 'axios';

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. **Format your response in Markdown like this example:**

# Recipe Name
**Servings:** X  

## Ingredients  
- Ingredient 1  
- Ingredient 2  

## Instructions  
1. Step 1.  
2. Step 2.  

Use headings (#, ##), lists (- or 1.), and bold (**text**) for clarity.`

export async function getRecipeFromGroq(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",  // Free model (fast!)
        messages: [
          { 
            role: "system", 
            content: SYSTEM_PROMPT
          },
          { 
            role: "user", 
            content: `I have ${ingredientsString}. Please give me a recipe!` 
          }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error);
    return "Sorry, I couldn't fetch a recipe. Try again later!";
  }
}