import type { Component, JSX } from 'solid-js'

type Props = { } & Partial<JSX.ImgHTMLAttributes<HTMLImageElement>>

const Image: Component<Props> = (props) => {
  return (
    <img
      {...props}
    />  
  )
}

export {
  Image as default,
}
