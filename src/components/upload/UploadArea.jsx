import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { UploadCloud, FileText, X, Loader2 } from 'lucide-react'

import { uploadReceipt } from '../../api/receiptApi.js'

// Which file types the upload area accepts.
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf']
const ACCEPTED_ATTR = '.png,.jpg,.jpeg,.pdf'

function UploadArea() {
  // The file the user picked (or dropped), and a preview URL for images.
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragActive, setIsDragActive] = useState(false)

  // Hidden <input type="file" /> that we trigger by clicking the drop area.
  const fileInputRef = useRef(null)

  // React Query mutation for the actual upload request.
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => uploadReceipt(formData),
    onSuccess: () => {
      toast.success('Receipt uploaded successfully!')
      clearSelection()
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Failed to upload receipt. Try again.'
      toast.error(message)
    },
  })

  // Stores the picked file and, if it's an image, generates a preview.
  const handleFile = (file) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Only PNG, JPG, JPEG, or PDF files are allowed')
      return
    }

    setSelectedFile(file)

    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(null)
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // --- Drag & drop handlers ---
  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragActive(false)
    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = () => {
    setIsDragActive(false)
  }

  // --- Click to open the file picker ---
  const handleAreaClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0]
    handleFile(file)
  }

  // --- Upload button ---
  const handleUpload = () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)
    mutate(formData)
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Drop zone */}
      <div
        onClick={handleAreaClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
          isDragActive
            ? 'border-[#8FBC8F] bg-[#E7F4E8]'
            : 'border-gray-200 bg-[#FAFAF7] hover:bg-[#F1F7F1]'
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E7F4E8]">
          <UploadCloud size={22} className="text-[#4C8C63]" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            Drag & drop your receipt here
          </p>
          <p className="mt-1 text-xs text-gray-500">
            or click to browse — PNG, JPG, JPEG, or PDF
          </p>
        </div>

        {/* Hidden native file input, triggered by clicking the drop zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_ATTR}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Selected file preview */}
      {selectedFile && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-[#FAFAF7] p-3">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Receipt preview"
              className="h-14 w-14 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#E7F4E8]">
              <FileText size={20} className="text-[#4C8C63]" />
            </div>
          )}

          <p className="flex-1 truncate text-sm text-gray-700">
            {selectedFile.name}
          </p>

          <button
            onClick={clearSelection}
            disabled={isPending}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
            aria-label="Remove selected file"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isPending}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8FBC8F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7CAE7C] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        {isPending ? 'Uploading...' : 'Upload Receipt'}
      </button>
    </div>
  )
}

export default UploadArea
