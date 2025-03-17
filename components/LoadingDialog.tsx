import { Loader2 } from 'lucide-react'

export function LoadingDialog() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-blue-600">Loading...</p>
      </div>
    </div>
  )
}