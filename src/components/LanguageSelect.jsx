import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useLanguage } from '@/services/language'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LanguageSelect() {
  const { language, setLanguage, languages } = useLanguage()
  const [selected, setSelected] = useState(language)

  useEffect(() => {
    setLanguage(selected)
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default border border-transparent bg-white py-2 pl-3 pr-10 text-left hover:border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-900 dark:hover:border-gray-700 sm:text-sm">
              <span className="block truncate uppercase">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              appear={true}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:ring-gray-700 sm:text-sm">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'bg-orange-600 text-white'
                          : 'text-gray-900 dark:text-gray-100',
                        'relative cursor-default select-none py-2 pl-4 pr-8'
                      )
                    }
                    value={language}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate uppercase'
                          )}
                        >
                          {language}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-orange-600',
                              'absolute inset-y-0 right-0 flex items-center pr-3'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
