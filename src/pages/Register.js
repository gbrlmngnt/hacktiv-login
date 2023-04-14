import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import { Link } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { reguser } from "../features/user";

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      email: '',
      address: '',
      gender: '',
      password: '',
      birthdate: '',
    },
    onSubmit: async (values) => {

      // Check if email and mobile already exist in db.json
      const existingUsersResponse = await fetch('http://localhost:8000/user');
      const existingUsers = await existingUsersResponse.json();
      const duplicateEmail = existingUsers.some(user => user.email === formik.values.email);
      const duplicateMobile = existingUsers.some(user => user.mobile === formik.values.mobile);

      if (duplicateEmail) {
        toast.warning('Email Already Exist', {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      if (duplicateMobile) {
        toast.warning('Mobile Already Exisist', {
          position: toast.POSITION.TOP_CENTER
        });
        return;
      }

      // Encrypt the password using CryptoJS AES
      const encryptedPassword = CryptoJS.AES.encrypt(values.password, 'your-secret-key').toString();
      const newUser = {
        name: formik.values.name,
        mobile: formik.values.mobile,
        email: formik.values.email,
        address: formik.values.address,
        gender: formik.values.gender,
        password: encryptedPassword,
        birthdate: formik.values.birthdate
      };


      try {
        // Send a POST request to the /users endpoint with the newUser data
        const response = await fetch('http://localhost:8000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        if (response.ok) {
          // Handle successful response
          dispatch(reguser(newUser))
          toast.success('User registered successfully', {
            position: toast.POSITION.TOP_CENTER
          });
          navigate('/');

        } else {
          // Handle error response
          toast.error('Failed to register user', {
            position: toast.POSITION.TOP_CENTER
          });
        }
      } catch (error) {
        // Handle fetch error
        console.error('Failed to fetch data:', error);

      }
    },
  });

  return (


    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

        <div className="md:w-1/2 md:px-16 ">
          <ToastContainer />
          <h2 className="font-bold mb-5 text-[#618D76]">Registration</h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

            <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">

              <input
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
                id="name"
                type="text"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>

            <div className="bg-gray-100 w-64 p-1 flex items-center ml-10">

              <input
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
                id="mobile"
                type="tel"
                placeholder="Mobile Number"
                pattern="[0-9]*"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </div>

            <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">

              <input
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
                id="email"
                type="email"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

            </div>



            <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">

              <textarea
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
                id="address"
                type="text"
                placeholder="Address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />

            </div>

            <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">

              <select
                className="bg-gray-100 outline-none text-sm  text-gray-500 flex-1 mb-2"
                required
                id="gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>


            </div>

            <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">

              <input
                className="bg-gray-100 outline-none text-sm flex-1 mb-2"
                required
                id="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />

            </div>

            <div className="bg-gray-100 w-64 p-1 flex  items-center ml-10">

              <input
                className="bg-gray-100 outline-none text-sm flex-1 text-gray-500"
                required
                id="birthdate"
                type="date"
                placeholder="Birthdate"
                onChange={formik.handleChange}
                value={formik.values.birthdate}

              />

            </div>

            <div className=" flex justify-between card-footer">
              <button type="submit" className="mr-10 border-white text-white bg-[#618D76] rounded-xl px-12 py-2 inline-block font-semibold hover:bg-green-800 hover:text-white">Register</button>
              <Link to="http://localhost:3000/" className="  border-white text-white bg-[#618D76] rounded-xl px-12 py-2 inline-block font-semibold hover:bg-green-800 hover:text-white">Close</Link>
            </div>



          </form>

        </div>

      </div>
    </section>





  );
};

export default Register;