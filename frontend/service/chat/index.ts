import { ChatPayload, ChatResponseCtx } from '@/interface/chat'
import { Dispatch, SetStateAction } from 'react'

const baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

interface ChatRequestCtx {
  payload: ChatPayload
  scrollToBottom: () => void
  setDone: Dispatch<SetStateAction<boolean>>
  setLastMsg: Dispatch<SetStateAction<string>>
}

export const ChatRequest = async ({
  payload, setLastMsg, setDone, scrollToBottom,
}: ChatRequestCtx) => {
  try {
    if (baseURL) {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.body !== null) {
        const reader = response.body.getReader()
        let done, value
        while (!done) {
          ({ done, value } = await reader.read())
          if (!done) {
            const chunk = new TextDecoder().decode(value)
            console.log('chunk', chunk)
            setLastMsg(prev => prev + chunk)
            scrollToBottom()
          }
          if (done) setDone(true)
        }
        console.log('Streaming complete.')
      }
    }
  } catch (error) {
    console.error(error)
  }
}
