import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FormikProvider, useFormik } from 'formik'
import { DocumentTextIcon, TrashIcon } from '@heroicons/react/outline'
import API from '@/services/api'
import { useNotification } from '@/services/notification'
import { classNames } from '@/utils/common'
import { processCSV } from '@/utils/csv'
import { AlertGreen } from '@/components/Alert'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import TextField from '@/components/TextField'

export default function AdminServiceProviderCreate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  // State of price plan
  const [file, setFile] = useState(null)
  const [fileIsValid, setFileIsValid] = useState(false)
  const [pricePlan, setPricePlan] = useState(null)

  useEffect(() => {
    // parse csv file
    processCSV(file)
      .then((parsed) => {
        setPricePlan(parsed)
        setFileIsValid(true)
      })
      .catch(() => {
        setFileIsValid(false)
      })
  }, [file])

  const validate = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = t('validation.required')
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (!fileIsValid) {
          throw new Error('Invalid file')
        }

        const payload = {
          name: values.name,
          ...pricePlan,
        }

        await API.ServiceProvider.create(payload)
        showNotification(t('message.service-provider-created'))
        navigate('/admin/service-providers')
      } catch (e) {
        showNotification(t('message.service-provider-not-created'))
        console.error(e)
      }
    },
  })

  const [isDragOver, setIsDragOver] = useState(false)
  const onDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragOver(true)

    // Style the drag-and-drop as a "copy file" operation.
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDragLeave = (e) => {
    setIsDragOver(false)
  }

  const onDrop = (e) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragOver(false)
    setFile(e.dataTransfer.files[0])
  }

  function renderFileInput() {
    if (fileIsValid) return null

    return (
      <div
        className={classNames(
          'grow rounded-lg border-2 border-dashed border-gray-200 px-6 pt-5 pb-6 dark:border-gray-700',
          isDragOver &&
            'border-orange-500 bg-orange-500/10 text-orange-500 dark:border-orange-500'
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="flex items-center justify-between space-x-4">
          <div className="flex text-gray-600 dark:text-gray-400">
            <label
              htmlFor="file"
              className="relative cursor-pointer rounded-sm bg-transparent font-medium text-orange-600 ring-offset-white focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500 dark:ring-offset-gray-900"
            >
              <span>{t('common.service-provider.upload-file')}</span>
              <input
                id="file"
                name="file"
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
              />
            </label>
            <p className="pl-1">
              {t('common.service-provider.or-drag-and-drop')}
            </p>
          </div>
          <DocumentTextIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    )
  }

  function renderFileStatus() {
    if (!fileIsValid) return null

    return (
      <div className="flex space-x-2">
        <AlertGreen className="grow" message="Price plan is valid" />
        <Button
          color="redOutline"
          className="inline-flex justify-center"
          title={t('common.remove')}
          onClick={() => {
            setFile(null)
          }}
        >
          <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    )
  }

  function renderForm() {
    return (
      <Form onSubmit={formik.handleSubmit} twoColumns width="two-thirds">
        <div className="sm:col-span-2">
          <TextField
            label={t('common.name')}
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : null
            }
            {...formik.getFieldProps('name')}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="file-upload"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            {t('common.service-provider.price-plan')}
          </label>
          {renderFileStatus()}
          {renderFileInput()}
        </div>
        <Button
          type="submit"
          disabled={!formik.isValid || formik.isDirty || !fileIsValid}
        >
          {t('common.create')}
        </Button>
      </Form>
    )
  }

  return (
    <>
      <Main>
        <Pagetitle title={t('common.service-provider.create')} />
        <Spacer size="lg" />
        {renderForm()}
      </Main>
    </>
  )
}
