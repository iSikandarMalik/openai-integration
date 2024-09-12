import { FC } from 'react'
import Image from 'next/image'
import Markdown from 'react-markdown'

type Props = {
  content: string
}
export const ChatSenderBubble: FC<Props> = ({ content }) => {
  return (
    <div className='rounded-3xl py-2.5 px-5 max-w-[70%] w-auto bg-[#2F2F2F]'>
      <p className='whitespace-pre-wrap'>
        { content }
      </p>
    </div>
  )
}

export const ChatReceiverBubble: FC<Props> = ({ content }) => {
  return (
    <div className='mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl'>
      <div className='flex-shrink-0 flex flex-col relative items-end'>
        <div className='p-2 flex items-center border border-[#424242] rounded-full'>
          <Image src='/assets/icons/gpt.svg' alt='icon' width={ 20 } height={ 20 }/>
        </div>
      </div>
      <div className='w-full min-w-0 flex-col'>
        <div
          className='min-h-[20px] text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words [.text-message+&]:mt-5'
        >
          <div className='flex w-full flex-col gap-1 empty:hidden first:pt-[3px]'>
            <div className='markdown prose w-full break-words dark:prose-invert dark'>
              <Markdown>
                { content }
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
