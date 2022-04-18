import Select from '@/components/Select'
import { useLanguage } from '@/services/language'

export default function LanguageSelect() {
  const { language, setLanguage, languages } = useLanguage()

  const options = languages.map((language) => {
    return { value: language, label: language }
  })

  const selectedIndex = options.findIndex((option) => option.value === language)

  const set = (option) => {
    setLanguage(option.value)
  }

  return <Select options={options} set={set} selectedIndex={selectedIndex} />
}
