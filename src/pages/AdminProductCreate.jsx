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
  const [images, setImages] = useState(null)
  const [previews, setPreviews] = useState(null)

  const ALLOWED_IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'image/avif',
  ]

  function addNewImages(files) {
    if (files === null) return

    if (files.length === 0) return

    let newFiles = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
        newFiles.push(file)
      } else {
        showNotification(t('message.file-type-not-allowed'))
      }
    }

    addPreviewImages(newFiles)

    if (images === null) return setImages(newFiles)

    setImages([...images, newFiles])
  }

  function addPreviewImages(newFiles) {
    const previewImages = []
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      const reader = new FileReader()
      reader.onload = () => {
        previewImages.push({
          id: file.name + Date.now(),
          src: reader.result,
        })
        if (previewImages.length === newFiles.length) {
          if (previews === null) return setPreviews(previewImages)
          setPreviews([...previews, ...previewImages])
        }
      }
      reader.readAsDataURL(file)
    }
  }

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
        let productImages = []
        if (images !== null && images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            const file = images[i]

            try {
              let productImage = await API.ProductImage.create(file)
              productImages.push(productImage)
            } catch (e) {
              throw new Error(e)
            }
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
    addNewImages(e.dataTransfer.files)
  }

  function renderFileInput() {
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
                  addNewImages(e.target.files)
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
      <div className="-mx-1 mb-4 flex grow flex-wrap">
        {previews.map((preview, index) => (
          <div key={preview.id} className="px-1">
            <button
              type="button"
              className="group relative h-14 w-14"
              onClick={() => {
                setPreviews(previews.filter((_, i) => i !== index))
                setImages(images.filter((_, i) => i !== index))
              }}
            >
              <div className="absolute top-0 left-0 z-10 flex h-14 w-14 items-center justify-center opacity-0 group-hover:opacity-100">
                <TrashIcon className="h-6 w-6" />
              </div>
              <img
                src={preview.src}
                alt="preview"
                className="h-14 w-14 object-cover group-hover:opacity-50"
              />
            </button>
          </div>
        ))}
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
          {renderPreviews()}
          {renderFileInput()}
        </div>
        <Button type="submit" disabled={!formik.isValid || formik.isDirty}>
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
