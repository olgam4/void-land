import { Motion } from '@motionone/solid'

import Image from '@components/image'
import NookScreenshot from '@assets/nook.png'

type FeatureProps = {
  left?: boolean
  title: string
  content: string
  image: string
}

// TODO: Add a Download
// <div class="p-12 h-[80vh] flex flex-col">
//   <h2 id="download" class="text-4xl sm:text-8xl mb-12">Download.</h2>
//   <div class="flex flex-wrap sm:flex-row-reverse flex-center justify-self-center">
//     <div class="flex h-[200px] sm:ml-8 p-12 rounded-lg bg-white shadow-2xl">
//       <a class="flex cursor-pointer hover:text-orange-200 transition-colors items-center" href="https://github.com/olgam4/nook" target="_blank" rel="noreferrer">
//         <p class="text-center mr-2">Alpha avaliable <b><i>right now</i></b><br /> on GitHub</p>
//         <div class="i-carbon-logo-github w-28 h-28" />
//       </a>
//     </div>
//     <img class="w-[90%] mt-5 sm:mt-0 sm:w-[30%] sm:mb-0" srcset="/assets/download.svg" />
//   </div>
// </div>

export default function() {
  let backgroundDom: any

  const Feature = (props: FeatureProps) => {
    return (
      <li>
        <Motion.div
          initial={{ opacity: 0, x: props.left ? -200 : 200 }}
          inView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          class={`flex flex-col ${props.left? 'sm:flex-row-reverse' : 'sm:flex-row'} p-10 w-full shadow-black shadow-2xl bg-white sm:w-7/12 text-[#2f4858] rounded-xl mb-12 ${props.left && 'sm:ml-auto'}`}
        >
          <div>
            <h3 class="text-lg lg:text-4xl bg-[#2F4858] rounded-full px-5 py-2 mb-4 font-black text-[#FFB5DD] uppercase ">{props.title}</h3>
            <p class="pl-8">{props.content}</p>
          </div>
          <img class="w-[90%] mt-2 sm:mt-0 sm:w-[50%]" srcset={`/assets/${props.image}`} />
        </Motion.div>
      </li>
    )
  }

  const features: { content: string, title: string, image: string }[] = [
    {
      title: 'Use your files',
      content: 'Nook uses your file system to store your notes. This means that your notes are always available wherever you are, right there on the disk.',
      image: 'file.svg'
    },
    {
      title: 'Markdown',
      content: 'Write your notes in Markdown, and Nook will render them for you. Use Mermaid and KaTex to create diagrams and math equations.',
      image: 'markdown.svg'
    },
    {
      title: 'Powered by AI (WIP)',
      content: 'Nook uses AI to help you find your notes. It will also suggest tags for you, and help you find related notes. Easily translate your notes to other languages and utilize Nook to enhance your grammar.',
      image: 'ai-powered.svg'
    },
    {
      title: 'CMS (WIP)',
      content: 'Nook is a CMS. You can create, edit, and delete notes. You can also create and delete tags. Nook will automatically update your notes when you change a tag.',
      image: 'cms.svg'
    },
    {
      title: 'Own your data',
      content: 'Save your notes on your computer. You decide where they go and you keep them, for yourself, for ever.',
      image: 'own.svg'
    },
    {
      title: 'Collaborate (WIP)',
      content: 'Nook is built to be collaborative. You can share your notes with others, and they can edit them. You can also share your notes with the world. Hosting a collaboration server is as easy deploying a docker.',
      image: 'collaborate.svg'
    },
  ]

  const prices = [
    {
      link: '/account?plan=14k4gseHs2gD1zO147',
      price: 'Tip jar',
    },
    {
      link: '/account?plan=9AQbIU2YK5sPemA28a',
      price: '10.49$',
    },
    {
      link: '/account?plan=eVabIU1UG2gD2DS5kl',
      price: '94.49$',
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

  return (
    <div>
      <div class="flex flex-col h-[100vh] w-[100vw] bg-gradient-to-tr from-[#ffafbd] to-[#ffc3a0]">
        <nav class="hidden sm:block absolute mt-4 md:mt-0 top-16 right-8 z-50">
          <ul class="grid grid-cols-3 text-xl md:gap-1 gap-2 text-white">
            <li class="w-[100px] text-right"><a class="cursor-pointer hover:font-black transition-all" href="#features">Features</a></li>
            <li class="w-[100px] text-right"><a class="cursor-pointer hover:font-black transition-all" href="#pricing">Pricing</a></li>
            <li class="w-[160px] text-right"><a class="flex cursor-pointer items-center hover:font-black transition-all" target="_blank" rel="noreferrer" href="https://discord.gg/QXRMPDzXds">Chat with us <div class="i-carbon-arrow-right ml-2" /></a></li>
          </ul>
        </nav>
        <h1 class="h-[9%] mt-4 pl-4 sm:pl-12 text-amber-50 relative nook-shadow flex items-center">Nook</h1>
        <h2 class="h-[3%] mt-4 pl-4 sm:pl-12 text-[#2f4858] opacity-20">Markdown-Powered Intelligent Knowledge Manager</h2>
        <div class="h-[60%] mt-4 flex justify-center">
          <Image class="object-contain" src={NookScreenshot} />
        </div>
        <div>
          <div class="absolute bottom-20 sm:bottom-32 left-0 right-0 h-[10%] flex justify-center items-center">
            <a href="/account" class="flex items-center hover:scale-110 hover:text-gray-400 transition-all shadow-2xl rounded-full text-white font-black text-2xl sm:text-4xl p-4 mx-4 text-center sm:p-12 bg-[#2F4858] uppercase">
              Start your journey now
            </a>
          </div>
        </div>
      </div>
      <div class="bg-[#2f4858] text-white p-12 overflow-x-clip">
        <h2 id="features" class="text-4xl sm:text-8xl mb-12">Features.</h2>
        <ul>
          <For each={features}>{(feature, index) => <Feature {...feature} left={index() % 2 !== 0} />}</For>
        </ul>
      </div>
      <div id="pricing" class="p-12 mb-20 bg-gradient-to-b from-[#ffc3a0] to-gray-50">
        <h2 class="text-4xl sm:text-8xl mb-12 text-white">Pricing.</h2>
        <div class="flex justify-center text-gray-600 flex-col md:flex-row md:items-end">
          <div class="rounded-2xl bg-gray-50 hover:scale-110 mb-3 md:m-12 transition-transform shadow-2xl md:max-w-1/6 flex flex-col justify-between items-center h-72 p-10">
            <h3 class="text-2xl font-bold">{prices[0].price}</h3>
            <ul class="space-y-2 list-disc">
              <li>Support the project</li>
              <li>Recommended for enterprise use</li>
            </ul>
            <a class="px-10 py-3 rounded-2xl text-white uppercase font-bold bg-gradient-to-tr from-[#FFC0FF] to-[#FFB5DD]" href={prices[0].link}>Buy</a>
          </div>
          <div class="rounded-2xl text-black hover:scale-110 mb-3 md:m-2 transition-transform md:min-w-fit shadow-2xl md:max-w-1/5 flex flex-col justify-between items-center sm:h-96 p-10 bg-gradient-to-tr from-[#FFC0FF] to-[#FFB5DD]">
            <h3 class="text-3xl font-black text-white">{prices[1].price} / month</h3>
            <ul class="space-y-2 list-disc">
              <li>Get insider builds</li>
              <li>Share your notes online WIP</li>
              <li>Create unlimited notes</li>
              <li>Sync your notes across devices WIP</li>
            </ul>
            <a class="px-10 py-3 rounded-2xl text-white bg-[#2f4858] shadow-xl uppercase font-bold" href={prices[1].link}>Buy</a>
          </div>
          <div class="bg-gray-50 rounded-2xl hover:scale-110 mb-3 md:m-12 transition-transform shadow-2xl  flex flex-col justify-between items-center h-72 p-10">
            <h3 class="text-2xl font-bold">{prices[2].price} / year</h3>
            <div class="text-center"><b>Save 31.39$</b> on the monthly plan</div>
            <ul class="flex flex-col justify-center items-center">
              <li></li>
            </ul>
            <a class="px-10 py-3 text-white uppercase rounded-2xl font-bold bg-gradient-to-tr from-[#FFC0FF] to-[#FFB5DD]" href={prices[2].link}>Buy</a>
          </div>
        </div>
      </div>
      <div ref={backgroundDom} class="flex flex-col relative flex-center h-[100vh] overflow-hidden">
        <div class="p-40 text-3xl text-center rounded-xl shadow-2xl bg-gradient-to-b from-[#FFC0FF] to-[#FFB5DD]">
          <p class="text-gray-700">Join in the<a href="/account" class="cursor-pointer underline underline-offset-4 text-gray-50 font-black ml-2 hover:text-[#A0003A] transition-colors">fun</a></p>
        </div>
        <div class="absolute bottom-10 left-0 right-0 flex justify-center">
          <ul class="flex space-x-5">
            <li>
              <a href="https://twitter.com/yournookapp" target="_blank" rel="noreferrer" class="cursor-pointer hover:text-[#ff85dd] transition-colors">
                <div class="i-carbon-logo-twitter w-7 h-7" />
              </a>
            </li>
            <li>
              <a href="https://discord.gg/QXRMPDzXds" target="_blank" rel="noreferrer" class="cursor-pointer hover:text-[#ff85dd] transition-colors">
                <div class="i-carbon-logo-discord w-7 h-7" />
              </a>
            </li>
            <li>
              <a href="https://bat.glo.quebec/" target="_blank" rel="noreferrer" class="cursor-pointer hover:text-[#ff85dd] transition-colors">
                <div class="i-carbon-bat w-7 h-7" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    <div class="flex">
      <a class="w-full text-center" href="/terms">Terms and Privacy</a>
    </div>
    </div>
  )
}
