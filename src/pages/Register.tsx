import { Link, useNavigate, Navigate } from "react-router-dom";
import { registerRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { useAuthStore } from '../store/auth';



const Register = () => {

  const navigate = useNavigate();
  const { isAuth, setToken } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  interface RegisterInput {
    username: string;
    password: string;
  }

  interface RegisterResponse {
    access: string;
    refresh: string;
  }


  const registerMutation = useMutation<RegisterResponse, Error, RegisterInput>({
    mutationFn: ({ username, password }) => registerRequest(username, password),
    onSuccess: (response) => {
      const { access, refresh } = response; 
      setToken(access, refresh);
      toast.success("Registro exitoso!");
      navigate("/");
      console.log(response);
    },
    onError: () => {
      toast.error("Hubo un error, intenta de vuelta");
    }
  });

  if (isAuth) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation.mutate({ username, password });
    console.log(username, password)
    console.log(registerMutation.isSuccess)
    
  };


  return (
    <>
    <h3 className="flex bg-[#c1d7ff] py-10 flex-col text-center text-3xl font-bold
     text-primary-800 items-center justify-center ">
       Register Page
    </h3>
    <form className="space-y-4 md:space-y-6 shadow-md h-screen py-10 flex flex-col
     items-center bg-[#c1d7ff]" id="register" 
       onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-primary-800">Username</label>
        <input
          value={username}
          onChange = {(e) => setUsername(e.target.value)}
          type="text" placeholder="Ex: Saul" className="bg-gray-500 border border-gray-800
           text-primary-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
            block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
           /> 
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary-800">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password" id="password" placeholder="••••••••" 
          className="bg-gray-500 border border-gray-800 text-primary-800 sm:text-sm rounded-lg
           focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:bg-gray-700
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
           dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
             />
      </div>

      <button type="submit" className=" text-white bg-primary-600
       hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium
        rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
         dark:focus:ring-primary-800">Sign up</button>
      <p className="text-sm font-light text-primary-800">
         have an account? <Link to={'/auth/login'} className="font-medium text-primary-600">Sign in</Link>

      </p>
    </form><Toaster /></>
  )
}

export default Register
