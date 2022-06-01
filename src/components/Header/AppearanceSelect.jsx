import { useTranslation } from 'react-i18next'
import Select from '@/components/Select'
import { useAppearance } from '@/services/appearance'

export default function AppearanceSelect({ className }) {
  const { t } = useTranslation()
  const { appearance, setAppearance, appearances } = useAppearance()

  const options = appearances.map((appearance) => {
    return { value: appearance, label: t(`common.appearance.${appearance}`) }
  })

  const selectedIndex = options.findIndex(
    (option) => option.value === appearance
  )

  const set = (option) => {
    setAppearance(option.value)
  }

  return (
    <Select
      options={options}
      set={set}
      selectedIndex={selectedIndex}
      className={className}
    />
  )
}
