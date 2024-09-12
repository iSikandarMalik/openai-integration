export interface ChatResponseCtx {
  role: string
  content: string
  refusal?: null
}

export interface ChatPayload {
  prevMessage?: ChatResponseCtx[]
  message: string
}
