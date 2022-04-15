import Main from '@/components/Main'
import { useTranslation } from 'react-i18next'

export default function Second() {
  const { t } = useTranslation()
  return (
    <Main>
      <h1 className="my-20 text-4xl font-extrabold leading-10 tracking-tight sm:text-6xl sm:leading-none lg:text-5xl xl:text-6xl">
        <div>{t('common.hero.headline')}</div>
        <div className="mt-6 inline-block bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
          PalletPals.
        </div>
      </h1>
    </Main>
  )
}
