import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Timeline from "./pages/Timeline/Timeline";



export default function App() {
  return(
    <BrowserRouter> 
    <Routes>
      <Route path="/" element={<SignInPage />  } />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
    </BrowserRouter>
  )
}