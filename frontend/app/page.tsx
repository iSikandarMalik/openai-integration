'use client'
import Image from 'next/image'
import { useEffect, useState, KeyboardEvent, useRef, useLayoutEffect } from 'react'

import ChatBody from '@/components/chat/body'
import { ChatRequest } from '@/service/chat'
import { ChatResponseCtx } from '@/interface/chat'

const Home = () => {
  const [message, setMessage] = useState('')
  const [lastMsg, setLastMsg] = useState<string>('')
  const [isDone, setDone] = useState(() => false)
  const [allMessages, setAllMessages] = useState<ChatResponseCtx[]>([])
  const endRef = useRef(null)

  const scrollToBottom = () => {
    if (endRef.current) {
      // @ts-ignore
      endRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePayload = () => {
    if (!allMessages.length) {
      return {
        message: message,
      }
    }
    if (allMessages.length < 4) {
      return {
        prevMessage: allMessages,
        message: message,
      }
    }
    return {
      prevMessage: allMessages.slice(allMessages.length - 4, allMessages.length - 1),
      message: message,
    }
  }

  const handleSubmit = async () => {
    if (message.length > 1) {
      try {
        setMessage('')
        setAllMessages(prev => [
          ...prev, {
            role: 'user',
            content: message,
          },
        ])
        scrollToBottom()
        await ChatRequest({
          setDone: setDone,
          setLastMsg: setLastMsg,
          payload: handlePayload(),
          scrollToBottom: scrollToBottom,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key.toLowerCase() === 'enter') {
      return
    }
    if (event.key.toLowerCase() === 'enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (isDone && lastMsg.length > 0) {
      setDone(false)
      setAllMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: lastMsg,
        },
      ])
      scrollToBottom()
      setLastMsg('')
    }
  }, [isDone])

  useLayoutEffect(() => {
    if (endRef.current) console.log(endRef.current)
  }, [])

  return (
    <div
      className='flex flex-col items-center justify-end h-screen text-base py-[18px] px-3 m-auto w-full md:px-5 lg:px-1 xl:px-5'>
      <div
        className='w-full h-auto max-h-screen overflow-auto mx-auto text-base md:max-w-3xl mb-5'>
        <ChatBody data={ allMessages } lastMsg={ lastMsg }/>
        <div className='invisible' ref={ endRef }/>
      </div>
      <div
        className='w-full min-h-[52px] max-h-52 flex items-center gap-1.5 bg-[#2F2F2F] rounded-[26px] p-1.5 md:max-w-3xl'>
        <textarea
          value={ message }
          placeholder='Message GPT'
          onKeyDown={ handleKeyDown }
          onChange={ e => setMessage(e.target.value) }
          className='w-full h-full overflow-hidden box-border resize-none m-0 border-0 bg-transparent pt-2 px-4 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none max-h-52'
        />
        <button
          onClick={ handleSubmit }
          className={ `${ message.length > 0 ? 'bg-white' : 'bg-[#676767]' } rounded-full w-8 h-8` }
        >
          <Image src='/assets/icons/arrow-up.svg' alt='arrow up' width={ 32 } height={ 32 }/>
        </button>
      </div>
    </div>
  )
}

export default Home
