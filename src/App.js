import React from "react";
import Home from "./Components/Home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Graph from "./Components/Graph/Graph";
import { CustomerProvide } from "./Context/CustomerContext";
const queryClient = new QueryClient();
const routers = createHashRouter([
    { index: true, element: <Home /> },
    { path: "/TrancationGraph/:id", element: <Graph /> },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CustomerProvide>
          <RouterProvider router={routers} />
        </CustomerProvide>
      </QueryClientProvider>
    </>
  );
}

export default App;
