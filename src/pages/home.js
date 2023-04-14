import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/userlogin";
import { useDispatch } from "react-redux";


const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlelogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <section className="flex flex-col h-screen">
        <div className="flex items-center h-20 ">
            <div className="mx-auto relative px-5 max-w-screen-lg w-full flex items-center justify-end mt-4">
                <nav className="text-[#618D76] flex gap-5 font-bold">
                    <button>Home</button>
                    <button>About</button>
                    <button>Services</button>
                    <button>Contact Us</button>

                </nav>
            </div>
        </div>
        <div className="flex-1 flex items-center">
        <div className="text-center mx-auto">
            <h1 className="text-6xl font-extrabold text-[#618D76] ">Welcome to Hacktiv Colab Inc.</h1>
            <p className="font-light text-3xl mt-5 mb-6">Let us do the dirty work.</p>
             <Link className="px-5 py-2 rounded-full bg-[#618D76]  text-white font-bold hover:bg-green-800 transition-colors mt-20" to={'/Landing'}>My Profile</Link>
             
             <button className="px-5 py-2 rounded-full bg-[#618D76]  text-white font-bold hover:bg-green-800 transition-colors mt-20"
            type = "submit"
            onClick = {handlelogout}
            >    
                Logout
            </button>
        </div>
    </div>
    </section>
        
    );
}


export default Home;