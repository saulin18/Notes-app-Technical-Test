

function Loader() {
  return (
    <div className="flex items-center justify-center my-20">
  <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-blue-500" role="status">
    <span className="sr-only">Loading...</span>
  </div>
</div>
  )
}

export default Loader