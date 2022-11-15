import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const configuration = new Configuration({
    apiKey: config.apiKey,
  });
  const openai = new OpenAIApi(configuration);
  
  const body = await readBody(event)
  
  const response = await openai.createImage({
    prompt: body.prompt,
    n: 1,
    size: "1024x1024",
  });

  return response.data.data[0].url;
})