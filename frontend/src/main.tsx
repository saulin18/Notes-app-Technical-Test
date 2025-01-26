import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import {
  QueryClient as TanstackQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    children: [
      {
        path: "/notes/update/:pk",
        element: <div>Update</div>,
      },
      {
        path: "/notes/delete/:pk",
        element: <div>Archive</div>,
      },
    ],
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
