
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



const Landing = () => {
    const user = useSelector(state => state.login.activeUser)

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center ">

                <div className="md:w-1/2 md:px-16 ">
                    <h2 className="font-bold text-sm mb-5 text-[#618D76] ">User Profile</h2>

                    <form className="flex flex-col gap-4" >
                        <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">
                            <h2 className="font-bold mb-5 text-[#618D76]">Name: {user.name}</h2>

                        </div>

                        <div className="bg-gray-100 w-64 p-1 flex items-center ml-10">
                            <h2 className="font-bold mb-5 text-[#618D76]" > Mobile: {user.mobile}</h2>

                        </div>

                        <div className="bg-gray-100 w-64 p-1 flex items-center ml-10">
                            <h2 className="font-bold mb-5 text-[#618D76]" > Email: {user.email}</h2>

                        </div>

                        <div className="bg-gray-100 w-64 p-1 flex items-center ml-10">
                            <h2 className="font-bold mb-5 text-[#618D76]" > Address: {user.address}</h2>

                        </div>

                        <div className="bg-gray-100 w-64 p-1 flex items-center ml-10">

                            <h2 className="font-bold mb-5 text-[#618D76]" > Gender: {user.gender}</h2>

                        </div>

                        <div className="bg-gray-100 w-64 p-1 flex items-center ml-10">

                            <h2 className="font-bold mb-5 text-[#618D76]" > Birthdate: {user.birthdate}</h2>

                        </div>
                        <Link className="px-5 py-2 rounded-full bg-[#618D76]  text-white font-bold hover:bg-green-800 transition-colors mt-20" to={'/home'}>Back</Link>


                    </form>
                </div>
            </div>

            <div>





            </div>

        </section>


    );
}

export default Landing;