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
        model: settings.openai.news.model,
        temperature: settings.openai.news.temperature,
        messages: [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: settings.openai.news.prompt,
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: text,
          }
        ]
      })
      .then(chatCompletion => chatCompletion.data.choices[0].message.content)
    },
    mainStatementOf(text) {
      return openai.createChatCompletion({
        model: settings.openai.books.ct.model,
        temperature: settings.openai.books.ct.temperature,
        max_tokens: settings.openai.books.ct.maxTokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: [
          {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: settings.openai.books.ct.prompt,
          },
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: text,
          }
        ]
      })
      .then(result => result.data.choices[0].message.content)
    },
  }
}