import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/user.context";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserPage from "./pages/UserPage/UserPage";


export default function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  )
}