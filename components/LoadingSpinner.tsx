"use client"

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="w-full h-full border-2 border-orange-500 border-t-transparent rounded-full"></div>
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className="w-80 h-80 bg-gray-700/30 rounded-xl animate-pulse flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
