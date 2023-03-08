import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserPage from "./pages/UserPage/UserPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/user/:id" element={UserPage} />
      </Routes>
    </BrowserRouter>
  )
}