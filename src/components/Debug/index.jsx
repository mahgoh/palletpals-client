import Button from '@/components/Button'
import { useTranslation } from 'react-i18next'

export default function Debug({ data }) {
  const { t } = useTranslation()

  function copy() {
    navigator.clipboard.writeText(JSON.stringify(data))
  }

  if (GLOBAL.DEBUG) {
    return (
      <div className="relative my-10 bg-rose-50 p-6 pt-12 text-rose-500">
        <div className="absolute top-4 left-4 text-sm uppercase">Debug</div>
        <Button color="red" className="absolute top-4 right-4" onClick={copy}>
          {t('common.copy')}
        </Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  } else {
    return null
  }
}
