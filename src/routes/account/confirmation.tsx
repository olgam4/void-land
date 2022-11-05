import { useNavigate } from 'solid-start'

export default function() {
  const navigate = useNavigate()

  createEffect(() => {
    const el = document.getElementById('progress-bar')

    if (el) {
      el.style.width = '100%'
      el.style.transition = 'width 6s linear'
    }

    setTimeout(() => {
      window.localStorage.setItem('plan', 'paid')
      navigate('/account/settings')
    }, 1000 * 10)
  })

  return (
    <div class="full flex flex-col flex-center space-x-4">
      <div class="p-4">
        <div class="flex space-x-4 items-end">
          <div class="i-carbon-checkmark-outline text-green-500 w-10 h-10" />
          <h1 class="text-2xl">Thanks for your purchase !</h1>
        </div>
        <div id="progress-bar" class="mt-4 w-0 h-1 bg-blue-400 shadow-blue-400 shadow-2xl rounded-full" />
      </div>
    </div>
  )
}
