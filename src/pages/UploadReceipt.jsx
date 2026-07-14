import UploadArea from '../components/upload/UploadArea.jsx'

function UploadReceipt() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Receipt</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload a receipt and FinSight AI will automatically read it and log
          the expense for you.
        </p>
      </div>

      <UploadArea />
    </div>
  )
}

export default UploadReceipt
