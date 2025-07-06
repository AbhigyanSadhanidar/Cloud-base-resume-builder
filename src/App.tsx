import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
