import "./App.css";
import {Route,Routes} from "react-router-dom";
import Layout from "./Layout";
import { UserContextProvider } from "./UserContext";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
return (
  <UserContextProvider>
    <Routes>
    <Route path="/" element={<Layout/>}>
    <Route index element = {<IndexPage/>} />
    <Route path ={'/login'} element = {<LoginPage/>}/>
    <Route path ={'/register'} element = {<RegisterPage/>}/>
  </Route>
  </Routes>
  </UserContextProvider>
);
}
  

export default App;
