import { createI18nContext, I18nContext } from '@solid-primitives/i18n'
import { FlowComponent } from 'solid-js'
import en from './en'

const context = createI18nContext({ en }, 'en')

const Provider: FlowComponent = (props) => (
  <I18nContext.Provider value={context}>
    {props.children}
  </I18nContext.Provider>
)


export {
  en,
  Provider,
}
