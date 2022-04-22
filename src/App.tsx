import React from "react";

  
import "./index.css";
import { Routes, Route } from "react-router-dom";
import LandPage from "./pages/LandPage";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import PokemonDetail from "./pages/PokemonDetail";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandPage />} />
        <Route path="/:name" element={<PokemonDetail/>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
