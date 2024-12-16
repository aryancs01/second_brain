import { Dashboard } from "./pages/Dashboard"
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
        
      </RecoilRoot>
    </>
  )
}

export default App
