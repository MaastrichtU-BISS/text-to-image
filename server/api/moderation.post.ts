import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const configuration = new Configuration({
    apiKey: config.apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const body = await readBody(event)

  const response = await openai.createModeration({
    input: "I want to kill them.",
  });

  return response;
})