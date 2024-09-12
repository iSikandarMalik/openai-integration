import { ChatReceiverBubble, ChatSenderBubble } from '../bubble'
import { ChatResponseCtx } from '@/interface/chat'
import { FC } from 'react'

type Props = {
  data: ChatResponseCtx[]
  lastMsg: string
}
const ChatBody: FC<Props> = ({ data, lastMsg }) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      { data.map(({ content, role }, idx) => (
        <>
          { role === 'user' ? (
            <div key={ idx } className='flex flex-col items-end'>
              <ChatSenderBubble content={ content }/>
            </div>
          ) : (
            <div key={ idx }>
              <ChatReceiverBubble content={ content }/>
            </div>
          ) }
        </>
      )) }
      { lastMsg.length > 0 && <ChatReceiverBubble content={ lastMsg }/> }
    </div>
  )
}

export default ChatBody
