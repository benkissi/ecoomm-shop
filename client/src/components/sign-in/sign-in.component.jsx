import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss'

const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({email:'', password:''})
    
    const {email, password} = userCredentials
    const handleSubmit = async event => {
        event.preventDefault()
        emailSignInStart(email, password)
    }

    const handleChange = event => {
        const { name, value} = event.target

        setCredentials({...userCredentials, [name]: value})
    }
        
        return (
            <div className='sign-in'>
                <h2>I already have and account  </h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={email} 
                        required 
                        label='Email'
                        handleChange={handleChange}/>
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={password} 
                        required 
                        label='password'
                        handleChange={handleChange}/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                    
                </form>

            </div>
        )
    }

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)