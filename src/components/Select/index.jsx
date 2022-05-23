import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'
import { classNames } from '@/utils/common'

export default function Select({
  options,
  selectedIndex,
  set,
  classes = [],
} = {}) {
  const [selectedOption, setSelectedOption] = useState(options[selectedIndex])

  useEffect(() => {
    set(selectedOption)
  }, [selectedOption])

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <div className={classNames('relative', ...classes)}>
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-transparent bg-white py-2 pl-3 pr-10 text-left hover:border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 dark:bg-gray-900 dark:hover:border-gray-700 dark:focus:border-orange-500 sm:text-sm">
              <span className="block truncate uppercase">
                {selectedOption.label}
              </span>
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
              leave="transition ease-out duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4"
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
            >
              <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full -translate-y-4 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:ring-gray-700 sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'bg-orange-100 dark:bg-orange-600 '
                          : 'text-gray-900 dark:text-gray-100',
                        'relative cursor-default select-none py-2 px-4'
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classNames(
                            selected
                              ? 'font-bold text-orange-500'
                              : 'font-normal',
                            'block truncate uppercase'
                          )}
                        >
                          {selected}
                          {option.label}
                        </span>
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

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  set: PropTypes.func.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string),
}
