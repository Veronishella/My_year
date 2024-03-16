
import React, { useState } from 'react'
import  supabase  from '../client'
import { AuthApiError } from '@supabase/supabase-js'
import { Link, useNavigate } from 'react-router-dom'
import "./login.scss"


const Login = ({setToken}) => {
    let navigate = useNavigate()
    //set Component state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    console.log(formData)
    //fn for getting some changes from input fields
    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                //set the new value from user input
                [event.target.name]: event.target.value
            }
        })

    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            //console.log("kod v bloku try je spusten")
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })

            if (error) throw error
            console.log(data)
            setToken(data)
            navigate('/homepage')


        }
        catch (error) {
            alert(error)

        }

    }

    return (
        <div className='section login-box'>
           
            <form onSubmit={handleSubmit}>

                <h1>Happy Days</h1> 
                <hr />
                <input className='input-box'
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />

                <input className='input-box'
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />

                <button type="submit">Submit
                </button>
                Don´t have an account? <Link to="/signup">Sign Up</Link>
            </form>

          
        </div>
    )
}

export default Login
