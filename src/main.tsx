import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import { QueryClient as TanstackQueryClient, QueryClientProvider,  } from "@tanstack/react-query";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizesPage from "./pages/QuizesPage";
import QuizCreate from "./pages/QuizCreate";
import CreateSolution from "./pages/CreateSolution";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    children: [
      {
        path: "/update/:pk",
        element: <div>Update</div>,
      },
      {
        path: "/quizes/",
        element: <QuizesPage />,
      },
      {
        path: "/quizes/create",
        element: <QuizCreate />,
      },
      {
        path: "/quizes/solutions/:id",
        element: <CreateSolution />,
      }
    ],
    
  },
    {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
]);

export const queryClient = new TanstackQueryClient(); 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
