import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ManageUser from "./pages/ManageUser";
import CreateNewUser from "./pages/CreateNewUser";
import EditUser from "./pages/EditUser";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/manage-user' element={<ManageUser />} />
                <Route path='/create-new-user' element={<CreateNewUser />} />
                <Route path='/edit-user' element={<EditUser />} />
                {/* DONE */}
                 <Route path='/login' element={<LoginPage />} />
                
            </Routes>
        </Router>
    );
};

export default App;