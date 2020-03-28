import React from 'react';

import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth ,CreateUserProfileDocument} from '../../firebase/firebase.utils';

class SignUp extends React.Component{
    constructor(){
        super();


        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

handleSubmit =async event =>{
    event.preventDefault();

    const {displayName,email,password,confirmPassword}=this.state;

    if(password!==confirmPassword){
        alert('password did not match')
        return;
    }

    try{
         const {user} =await auth.createUserWithEmailAndPassword(email,password);
         CreateUserProfileDocument(user,{displayName});

         this.setState({
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
         })
    }catch(error){
console.log(error);
    }
}

handleChane= event =>{
    const {name,value}=event.target;
    this.setState({[name]:value})
}

    render(){
        const {displayName,email,password,confirmPassword}=this.state;
        return(
                <div className='sign-up'>
                <h2 className='title'> I dont have a account</h2>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput 
                type='text'
                name='displayName'
                value={displayName}
                onChange={this.handleChane}
                label='Display Name'
                required
                />

                <FormInput 
                type='email'
                name='email'
                value={email}
                onChange={this.handleChane}
                label='email'
                required
                />

                <FormInput 
                type='password'
                name='password'
                value={password}
                onChange={this.handleChane}
                label='password'
                required
                />

                <FormInput 
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={this.handleChane}
                label='confirm Password'
                required
                />
               <CustomButton type='submit'>SIGN UP</CustomButton>
               
            
                </form>
                </div>
        )
    }
}

export default SignUp;