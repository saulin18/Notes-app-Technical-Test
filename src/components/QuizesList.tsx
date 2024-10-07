



function QuizesList() {
  
  
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-primary-800 items-center justify-center">
        Quizes
      </h1>
      <div className="flex flex-col items-center justify-center">
        <button className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
        <button className="bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
      </div>
    </div>
        
  )
}

export default QuizesList