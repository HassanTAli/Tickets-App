import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import TicketDetails from "./Components/TicketDetails/TicketDetails";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<TicketDetails />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
