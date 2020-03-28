import React from 'react';
import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';
import './sign-in-and-sign-out.styles.scss';

const SignInAndSignUpPAge=()=>(
    <div className='sign-in-and-sign-up'>
    <SignIn/>
    <SignUp/>
    </div>
)

export default SignInAndSignUpPAge;