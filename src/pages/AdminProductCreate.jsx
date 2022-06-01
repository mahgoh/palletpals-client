import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { PhotographIcon, TrashIcon } from '@heroicons/react/outline'
import API from '@/services/api'
import { useNotification } from '@/services/notification'
import { classNames } from '@/utils/common'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Main from '@/components/Main'
import Pagetitle from '@/components/Pagetitle'
import Spacer from '@/components/Spacer'
import TextArea from '@/components/TextArea'
import TextField from '@/components/TextField'

export default function AdminProductCreate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  // State of images
  const [files, setFiles] = useState(null)
  const [filesAreValid, setFilesAreValid] = useState(false)
  const [previews, setPreviews] = useState(null)

  const ALLOWED_IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/avif',
  ]

  function validateFiles() {
    if (files === null) return setFilesAreValid(false)

    if (files.length === 0) return setFilesAreValid(false)

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setFiles(null)
        setFilesAreValid(false)
        showNotification(t('message.file-type-not-allowed'))
        return
      }
    }

    setFilesAreValid(true)
  }

  function getPreviewImages() {
    if (files === null) return

    const previewImages = []
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)
      const reader = new FileReader()
      reader.onload = () => {
        previewImages.push(reader.result)
        if (previewImages.length === files.length) {
          setPreviews(previewImages)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    validateFiles()
    getPreviewImages()
  }, [files])

  const validate = (values) => {
    const errors = {}

    if (!values.name) {
      errors.name = t('validation.required')
    }

    if (!values.description) {
      errors.description = t('validation.required')
    }

    if (!values.details) {
      errors.details = t('validation.required')
    }

    if (!values.price) {
      errors.price = t('validation.required')
    } else if (values.price < 0.01) {
      errors.price = t('validation.min', { min: 0.01 })
    }

    if (!values.maxProducts) {
      errors.maxProducts = t('validation.required')
    } else if (values.maxProducts < 1) {
      errors.maxProducts = t('validation.min', { min: 1 })
    }

    if (!values.minPalletSpace) {
      errors.minPalletSpace = t('validation.required')
    } else if (values.minPalletSpace < 0.01) {
      errors.minPalletSpace = t('validation.min', { min: 0.01 })
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      description_de: '',
      description_fr: '',
      details: '',
      details_de: '',
      details_fr: '',
      price: 0.01,
      maxProducts: 1,
      minPalletSpace: 0.01,
    },
    validate,
    onSubmit: async (values) => {
      try {
        if (files !== null && !filesAreValid) {
          throw new Error('Invalid files')
        }

        let productImages = []
        for (let i = 0; i < files.length; i++) {
          const file = files.item(i)

          try {
            let productImage = await API.ProductImage.create(file)
            productImages.push(productImage)
          } catch (e) {
            throw new Error(e)
          }
        }

        const payload = {
          name: values.name,
          description: values.description,
          description_de: values.description_de,
          description_fr: values.description_fr,
          details: values.details,
          details_de: values.details_de,
          details_fr: values.details_fr,
          price: values.price,
          maxProducts: values.maxProducts,
          minPalletSpace: values.minPalletSpace,
          productImages: productImages,
        }

        await API.Product.create(payload)
        showNotification(t('message.product-created'))
        navigate('/admin/products')
      } catch (e) {
        showNotification(t('message.product-not-created'))
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
    setFiles(e.dataTransfer.files)
  }

  function renderFileInput() {
    if (filesAreValid) return null

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
              <span>{t('common.upload-file')}</span>
              <input
                id="file"
                name="file"
                type="file"
                accept=".jpg, .jpeg, .png, .webp, .avif, .gif"
                className="sr-only"
                multiple
                onChange={(e) => {
                  setFiles(e.target.files)
                }}
              />
            </label>
            <p className="hidden pl-1 sm:block">
              {t('common.or-drag-and-drop')}
            </p>
          </div>
          <PhotographIcon className="h-10 w-10 text-gray-400 dark:text-gray-600" />
        </div>
      </div>
    )
  }

  function renderPreviews() {
    if (previews === null) return null

    return (
      <div className="-mx-2 flex grow flex-wrap">
        {previews.map((preview, index) => (
          <div key={index} className="h-14 w-14 px-2">
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    )
  }

  function renderFileStatus() {
    if (!filesAreValid) return null

    return (
      <div className="flex space-x-2">
        {renderPreviews()}
        <Button
          color="redOutline"
          className="inline-flex justify-center"
          title={t('common.remove')}
          type="button"
          onClick={() => {
            setFiles(null)
            setPreviews(null)
          }}
        >
          <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    )
  }

  function renderForm() {
    return (
      <Form onSubmit={formik.handleSubmit} twoColumns width="full">
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
        <TextArea
          label={t('common.product.description')}
          error={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
          {...formik.getFieldProps('description')}
        />
        <div className="hidden sm:block"></div>
        <TextArea
          label={t('common.product.description') + ' (DE)'}
          error={
            formik.touched.description_de && formik.errors.description_de
              ? formik.errors.description_de
              : null
          }
          {...formik.getFieldProps('description_de')}
        />
        <TextArea
          label={t('common.product.description') + ' (FR)'}
          error={
            formik.touched.description_fr && formik.errors.description_fr
              ? formik.errors.description_fr
              : null
          }
          {...formik.getFieldProps('description_fr')}
        />
        <TextArea
          label={t('common.product.details')}
          error={
            formik.touched.details && formik.errors.details
              ? formik.errors.details
              : null
          }
          {...formik.getFieldProps('details')}
        />
        <div className="hidden sm:block"></div>
        <TextArea
          label={t('common.product.details') + ' (DE)'}
          error={
            formik.touched.details_de && formik.errors.details_de
              ? formik.errors.details_de
              : null
          }
          {...formik.getFieldProps('details_de')}
        />
        <TextArea
          label={t('common.product.details') + ' (FR)'}
          error={
            formik.touched.details_fr && formik.errors.details_fr
              ? formik.errors.details_fr
              : null
          }
          {...formik.getFieldProps('details_fr')}
        />
        <TextField
          label={t('common.product.max-products')}
          type="number"
          min={1}
          error={
            formik.touched.maxProducts && formik.errors.maxProducts
              ? formik.errors.maxProducts
              : null
          }
          {...formik.getFieldProps('maxProducts')}
        />
        <TextField
          label={t('common.product.min-pallet-space')}
          type="number"
          min={0.01}
          step={0.01}
          error={
            formik.touched.minPalletSpace && formik.errors.minPalletSpace
              ? formik.errors.minPalletSpace
              : null
          }
          {...formik.getFieldProps('minPalletSpace')}
        />
        <TextField
          label={t('common.product.price')}
          type="number"
          min={0.01}
          step={0.01}
          error={
            formik.touched.price && formik.errors.price
              ? formik.errors.price
              : null
          }
          {...formik.getFieldProps('price')}
        />
        <div className="sm:col-span-2">
          <label
            htmlFor="file-upload"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            {t('common.product.image', { numImages: 2 })}
          </label>
          {renderFileStatus()}
          {renderFileInput()}
        </div>
        <Button
          type="submit"
          disabled={!formik.isValid || formik.isDirty || !filesAreValid}
        >
          {t('common.create')}
        </Button>
      </Form>
    )
  }

  return (
    <>
      <Main>
        <Pagetitle title={t('common.product.create')} />
        <Spacer size="lg" />
        {renderForm()}
      </Main>
    </>
  )
}
