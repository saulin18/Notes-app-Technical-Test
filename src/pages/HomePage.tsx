import { Outlet } from "react-router-dom"




const HomePage = () => {

  return (
    <><div className='flex bg-[#c1d7ff] flex-col text-center text-3xl font-bold text-primary-800 items-center justify-center h-screen'>
          Quizes app by Saul
      </div>
      <Outlet /></>
    
  )
}

export default HomePage