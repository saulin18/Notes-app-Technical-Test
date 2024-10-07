import { Outlet } from "react-router"
import { Link } from "react-router-dom"


const HomePage = () => {

  return (
    <>
          <main className="flex flex-col items-center gap-3 justify-center h-full w-full bg-[#c1d7ff] pt-10"> 
      <h1 className='flex flex-col text-center text-2xl font-bold text-primary-800 items-center justify-center'>
          Quizes app by Saul
      </h1>
      
      <ul className="flex flex-row gap-6 items-center justify-center  bg-[#c1d7ff]">
              <li className='flex flex-col text-center text-2xl font-bold text-primary-800 items-center justify-center'> 
      <Link to="/auth/login" className="text-center text-xl font-bold text-primary-800">      
        Login
      </Link> </li>
                      <li> <Link to="/auth/register" className="text-center text-xl font-bold text-primary-800">      
                             Register
                          </Link> </li>
        <li> <Link to="/quizes/" className="text-center text-xl font-bold text-primary-800">      
        Quizes
      </Link> </li>
        
      </ul>
      
      <p className="text-center text-xl max-w-[990px] font-light text-primary-800">      
Phase 1: Quiz Hub
You are going to create QuizHub (www.quizhub.net) for people to host their quizzes. A quiz is a simple problem which can have multiple solutions. Users can post quizzes and other users can post solutions to those quizzes. A user can post only one solution in a quiz. They cannot edit the solution, but they can delete it if they want to. If they delete a solution, they cannot post another solution in the same quiz. A user cannot post a solution in their own quiz. The owner of the quiz can select a solution as winner. They can change the winner anytime they want, but they cannot remove a winner once set.

Users can read the quizzes anonymously, but they need to log in before posting a quiz or a solution. If they don't have an account, they need to sign up.

Backend should be Python + Django + DRF. Frontend should be React (no class components). Frontend doesn't have to be a single page application. Django can serve the pages and React can be used to enhance the experience. You can use any library you want on both python and javascript. Using typescript is a bonus but not required.

Interface doesn't have to be fancy or complex: it can be a simple page with all the quizzes, where the user can log in, sign up, answer quizzes, create quizzes and manage them. Pretty styles are a bonus, but functionality is what matters here.
      </p>   <Outlet />
      
      
      
      </main>

    </>
    
  )
}

export default HomePage