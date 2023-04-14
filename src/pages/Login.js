import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import * as Yup from 'yup';
import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import loginImg from '../assests/login1.jpg'
import { loginsuc, loginfail } from "../features/userlogin";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const formik = useFormik({
    initialValues: {
      usr: '',
      password: '',
    },  validationSchema: Yup.object({
      usr: Yup.string()
        .required('Enter Email or Mobile Number'),
      password: Yup.string()
        .required('Enter your password'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get(`http://localhost:8000/user/`);
        const data = response.data;
        const user = data.find((user) => user.email === values.usr || user.mobile === values.usr);
        console.log(data)
        if (user) {
          const userPassword = CryptoJS.AES.decrypt(user.password, 'your-secret-key');
          const decryptedPassword = userPassword.toString(CryptoJS.enc.Utf8);
          if (values.password === decryptedPassword) {
            dispatch(loginsuc(user))
            toast.success('Success');
            navigate('/Home')
          } else {
            dispatch(loginfail("Password doesn't match"))
            toast.error("Password doesn't match");
          }
        } else {
          dispatch(loginfail('User does not exist'))
          toast.error('User does not exist');
        }
      } catch (error) {
        console.error(error);
        dispatch(loginfail('Error occurred while fetching user data'))
        toast.error('Error occurred while fetching user data');
      }
    }
  })

  return (

    <section className="bg-gray-50 min-h-screen flex items-center justify-center">

      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

        <div className="md:w-1/2 md:px-16">
          <h2 className="font-bold text-2xl text-[#618D76]">Login</h2>
          <p className="text-sm mt-2 mb-7 text-[#618D76]">Welcome back you've been missed!</p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 ">

              <div className="bg-gray-100 w-64 p-1 flex items-center relative">
              <FaRegEnvelope className="text-gray-400 mr-2" />
              <input
                className="bg-gray-100 outline-none text-sm flex-1 absolute"
                id="usr"
                name="usr"
                type="usr"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usr}
                placeholder="Email or Mobile Number"
              />
            </div>
            {formik.touched.usr && formik.errors.usr ? (
              <div className="text-red-500 text-sm">{formik.errors.usr}</div>
            ) : null}
            
            <div className="bg-gray-100 w-64 p-1 flex items-center ">
              <MdLockOutline className="text-gray-400 mr-2" />
              <input
                className="bg-gray-100 outline-none text-sm flex-1"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}

            <button
              className="border-2 border-white text-white bg-[#618D76] rounded-xl px-12 py-2 inline-block font-semibold hover:bg-green-800 hover:text-white"
              type="submit"
            >
              LOGIN
            </button>

          </form>
          <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500"></hr>
            <p className="text-center">OR</p>
            <hr className="border-gray-500"></hr>
          </div>
          <p className="text-sm mt-2 mb-10 text-[#618D76] "> If you don't have an account ?</p>

          <Link className="bg-[#618D76] border px-12 py-2 text-white w-full rounded-xl mt-5 flex justify-center  font-semibold hover:bg-green-800 hover:text-white" to={'/register'}>Register Here </Link>
        </div>

        <div className="w-1/2 sm:block hidden ">

          <img className="rounded-2xl" src={loginImg} alt="#"></img>
        </div>

      </div>

    </section>

  );
};

export default Login;