
import {Routes,Route} from "react-router-dom"
import LoginForm from "./components/auth/LoginForm";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import CreatePost from "./pages/CreatePost";
import { PostDetail } from "./pages/PostDetail";
import ProfileDetail from "./pages/ProfileDetail";
import EditPost from "./pages/EditPost";
import Navbar from "./components/layout/Navbar";
import EditProfilePage from "./pages/EditProfilePage";
import { useCategories } from "./hooks/useCategories";
import PostsFilterPage from "./pages/PostFilterPage";
function App() {
   const {allCategories} = useCategories()
  return (
    
        <>
        <Navbar allCategories={allCategories} />
        <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/register" element={<Register />} />
    <Route path="/create-post" element={<CreatePost />}/>
    <Route path="/posts/:id" element={<PostDetail/>} />
    <Route path="/posts/:id/edit" element={<EditPost/>} />
    <Route path="/profile/:id" element={<ProfileDetail/>}></Route>
    <Route path="/search" element={<SearchPage />} />
    <Route path="/profile/edit" element={<EditProfilePage />} />
    <Route path="/posts" element={<PostsFilterPage/>} />
  </Routes>
        </>

  )

}

export default App;