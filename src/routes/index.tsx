import { Motion } from '@motionone/solid'

import Image from '@components/image'
import NookScreenshot from '@assets/nook.png'

type FeatureProps = {
  left?: boolean
  title: string
  content: string
  image: string
}

export default function() {
  let backgroundDom: any
  let card: any

  const [value, setValue] = createSignal('')
  const [error, setError] = createSignal(false)

  const Feature = (props: FeatureProps) => {
    return (
      <li>
        <Motion.div
          initial={{ opacity: 0, x: props.left ? -200 : 200 }}
          inView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          class={`flex p-10 shadow-black shadow-2xl bg-gradient-to-l from-[#FFB5DD] to-[#FFC0FF] w-7/12 text-[#2f4858] rounded-xl mb-12 ${props.left && 'ml-auto'}`}
        >
          <div>
            <h3 class="text-2xl font-bold">{props.title}</h3>
            <p>{props.content}</p>
          </div>
          <img width="50%" srcset={`/assets/${props.image}`} />
        </Motion.div>
      </li>
    )
  }

  const features: { content: string, title: string, image: string }[] = [
    {
      title: 'Markdown',
      content: 'Write your notes in Markdown, and Nook will render them for you. Use Mermaid and KaTex to create diagrams and math equations.',
      image: 'markdown.svg'
    },
    {
      title: 'Powered by AI',
      content: 'Nook uses AI to help you find your notes. It will also suggest tags for you, and help you find related notes. Easily translate your notes to other languages and utilize Nook to enhance your grammar.',
      image: 'ai-powered.svg'
    },
    {
      title: 'CMS',
      content: 'Nook is a CMS. You can create, edit, and delete notes. You can also create and delete tags. Nook will automatically update your notes when you change a tag.',
      image: 'cms.svg'
    },
    {
      title: 'Own your data',
      content: 'Save your notes on your computer. You decide where they go and you keep them, for yourself, for ever.',
      image: 'own.svg'
    },
    {
      title: 'Collaborate',
      content: 'Nook is built to be collaborative. You can share your notes with others, and they can edit them. You can also share your notes with the world. Hosting a collaboration server is as easy deploying a docker.',
      image: 'collaborate.svg'
    },
  ]

  createEffect(() => {
    const text = 'joininthefun'
    const context = document.createElement('canvas').getContext('2d')!
    context.fillStyle = 'rgba(0, 0, 0, 0.03)'
    context.font = 'bold 52px sans-serif'
    context.fillText(text, 0, 52)

    backgroundDom.style.backgroundImage = `url(${context.canvas.toDataURL('image/png')})`
  })

  const onWait = () => {
    card.classList.add('active')
  }

  const onCancel = () => {
    card.classList.remove('active')
  }

  const validate = () => {
    if (!value().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setError(true)
      return false
    }
    setError(false)
    return true
  }

  const subscribe = (e: any) => {
    e.preventDefault()

    if (!validate()) return

    fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: value() }),
    })
  }

  return (
    <div>
      <div class="flex flex-col h-[100vh] w-[100vw] bg-gradient-to-tr from-[#ffafbd] to-[#ffc3a0]">
        <nav class="md:absolute mt-4 md:mt-0 top-16 right-8 z-50">
          <ul class="grid grid-cols-3 text-xl md:gap-6 gap-2 text-white">
            <li class="w-[100px] text-right"><a class="cursor-pointer hover:font-black transition-all" href="#features">Features</a></li>
            <li class="w-[100px] text-right"><a class="cursor-pointer hover:font-black transition-all" href="#download">Download</a></li>
            <li class="w-[160px] text-right"><a class="flex cursor-pointer items-center hover:font-black transition-all" target="_blank" rel="noreferrer" href="https://discord.gg/QXRMPDzXds">Chat with us <div class="i-carbon-arrow-right ml-2" /></a></li>
          </ul>
        </nav>
        <h1 class="h-[9%] pl-12 text-amber-50 relative nook-shadow flex items-center">Nook</h1>
        <h2 class="h-[3%] pl-12 text-[#2f4858]">Markdown-Powered Intelligent Knowledge Manager</h2>
        <div class="h-[88%] flex justify-center">
          <Image class="object-contain" src={NookScreenshot} />
        </div>
      </div>
      <div class="bg-[#2f4858] text-white p-12">
        <h2 id="features" class="text-8xl mb-12">Features.</h2>
        <ul>
          <For each={features}>{(feature, index) => <Feature {...feature} left={index() % 2 !== 0} />}</For>
        </ul>
      </div>
      <div id="download" ref={backgroundDom} class="flex relative flex-center h-[100vh]">
        <h2 class="absolute max-w-full top-16 text-8xl uppercase font-black whitespace-nowrap  overflow-hidden">oon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon</h2>
        <div ref={card} class="flip">
          <div class="flip-content py-48 text-center w-[600px] rounded-xl shadow-2xl bg-gradient-to-b from-[#FFC0FF] to-[#FFB5DD]">
            <p class="text-gray-700 text-3xl top-44 flip-front">Subscribe to the <button onClick={onWait} class="cursor-pointer underline underline-offset-4 text-gray-50 font-black ml-2 hover:text-[#A0003A] transition-colors">waiting list</button></p>
            <div class="flip-back">
              <form class="absolute flex flex-col justify-around -top-48 p-10 w-full h-full">
                <div>
                  <label class="block text-gray-700 text-left text-xl font-bold" for="email">
                    Enter your email...
                  </label>
                  <input
                    onInput={(e) => { setValue(e.currentTarget.value) }}
                    id="email"
                    class="w-full p-4 rounded-xl mb-4"
                    type="email"
                    placeholder="john.doe@email.com"
                    onBlur={validate}
                  />
                  <Show when={error()}>
                    <p class="text-red-500 font-bold">Please enter a valid email</p>
                  </Show>
                </div>
                <input onClick={subscribe} type="submit" class="w-20 p-4 rounded-xl bg-gradient-to-l from-[#FFFADE] to-[#FFF7D0] text-black font-bold self-end cursor-pointer" value="JOIN" />
              </form>
              <button class="absolute cursor-pointer -top-44 left-2" onClick={onCancel}>
                <div class="i-carbon-arrow-left text-white text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}