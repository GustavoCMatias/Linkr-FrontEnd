import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/user.context";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}