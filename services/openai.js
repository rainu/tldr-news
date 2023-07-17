import {OpenAIApi, Configuration, CreateCompletionRequest} from 'openai'
import {useSettingsStore} from "~/store/settings";
import {ChatCompletionRequestMessageRoleEnum} from "openai/api";

export const openaiClient = () => {
  const settings = useSettingsStore()
  const openai = new OpenAIApi(new Configuration({
    apiKey: settings.openai.token,
  }))

  return {
    models(){
      return openai.listModels()
        .then(result => result.data.data)
    },
    summary(text) {
      return openai.createChatCompletion({
        model: settings.openai.model,
        temperature: settings.openai.temperature,
        messages: [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: settings.openai.prompt,
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: text,
          }
        ]
      })
      .then(chatCompletion => chatCompletion.data.choices[0].message.content)
    }
  }
}