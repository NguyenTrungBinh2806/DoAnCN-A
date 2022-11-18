import React, {useState} from 'react';
import db from '../../environment/firebase';
import auth from '../../environment/firebase';
import { collection, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Alert, toaster } from 'evergreen-ui';
import Login from '../login/login';
import './register.css';
function Register(){
    const InitializeState = {
        name: '',
        email: '',
        password:'',
        imageUrl: '',
        bio: '',
        confirmPassword: '',
        walletAddress: '',
        CreateAt: new Date(),
        cvIds: [],
    }
    const [state, setState] = useState(InitializeState);

    // register with email and password
    const register = async (e) => {
        e.preventDefault();
        const {name, email, password, imageUrl, confirmPassword, walletAddress} = state;
        if(password !== confirmPassword){
        //   the border of input will be red
            toaster.danger('Password and Confirm Password are not the same');
            return(
                document.getElementById('password').style.border = '1px solid red',
                document.getElementById('confirmPassword').style.border = '1px solid red'
            )

        }
        try{
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userRef = doc(db, "profiles", user.uid);
            await setDoc(userRef, {
                name,
                email,
                imageUrl,
                walletAddress,
                bio: '',
                CreateAt: new Date(),
                cvIds: [],
            });
            toaster.success('Register successfully, please login');
            setState(InitializeState);
            // if register success, it will redirect to login page
            window.location.href = '/login';
        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                toaster.danger('Email already in use');
            }
            if(error.code === 'auth/invalid-email'){
                toaster.warning('Invalid email');
            }
            if(error.code === 'auth/weak-password'){
                toaster.warning('Password must be at least 6 characters');
            }

        }
    }

    
    
    // connect metamask wallet and get wallet address and name account, console.log(walletAddress)
    const connectWallet = (e) => {
        e.preventDefault();
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                setState({
                    ...state,
                    walletAddress: accounts[0],
                })
            })
            .catch((err) => {
                if (err.code === 4001) {
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            }
        );          
    }

    // if input field is null, disable button
    const isInvalid = state.name === '' || state.password === '' || state.email === '' || state.confirmPassword === '' || state.walletAddress === '';

    return(
        <div className='register-page'>
            <h1 className='register-title'>Register</h1>
            <form className='register-form' onSubmit={register}>
                    <label htmlFor='name' className='register-label'>Name</label><br/>
                    <input type='text' name='name' id='name' className='input-field' placeholder='Enter your Name ...' value={state.name} onChange={(e) => setState({...state, name: e.target.value})}/>
                    <div className='require-field'></div><br/>
                    <label htmlFor='email' className='register-label'>Email</label><br/>
                    <input type='email' name='email' id='email' className='input-field' placeholder='Enter your Email' value={state.email} onChange={(e) => setState({...state, email: e.target.value})}/>
                    <div className='require-field'></div><br/>
                    <label htmlFor='password' className='register-label'>Password</label><br/>
                    <input type='password' name='password' id='password' placeholder='Enter your Password' className='input-field' value={state.password} onChange={(e) => setState({...state, password: e.target.value})}/>
                    <div className='require-field'></div><br/>
                    <label htmlFor='confirmPassword' className='register-label'>Confirm Password</label><br/>
                    <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Confirm your password' className='input-field' value={state.confirmPassword} onChange={(e) => setState({...state, confirmPassword: e.target.value})}/>
                    <div className='require-field'></div><br/>
                    <label htmlFor='walletAdress' className='register-label'>wallet Address</label> <br/> 
                    <div className='wallet-address'>
                        <Button onClick={connectWallet} appearance="primary" intent="success">Connect Wallet</Button>
                        <input type='text' name='walletAddress' id='walletAddress' placeholder='Address wallet' readOnly className='input-field-1' value={state.walletAddress} onChange={(e) => setState({...state, walletAddress: e.target.value})}/>
                    </div>
                    <div className='require-field'></div><br/>
                    <div className='register-button-submit'>
                        <Button type='submit' appearance="primary" intent="success" disabled={isInvalid}><h3>Register</h3></Button>
                    </div>
                    

            </form>
        </div>

    )
}

export default Register;