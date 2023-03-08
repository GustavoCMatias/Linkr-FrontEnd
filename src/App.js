import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";



export default function App() {
  return(
    <BrowserRouter> 
    <Routes>
      <Route path="/sign-in" element={<SignInPage />  } />
      <Route path="/sign-up" element={<SignUpPage />} />
      
    </Routes>
    </BrowserRouter>
  )
}