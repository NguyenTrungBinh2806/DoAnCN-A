import React, {useState, useEffect}from 'react';
import {loginWithEmail} from '../share/authService';
// import Dialog evergreen-ui
import { EyeOpenIcon, EyeClosedIcon } from 'evergreen-ui'
import './login.css'
function Login(){
    // const [isShown, setIsShown] = useState(false)
    const InitializeState = {
        email: '',
        password: '',
    }
    const [state, setState] = useState(InitializeState);
    const [user, setUser] = useState(null);
    const {email, password} = state;
    // check validation of email and password
    const handleChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        loginWithEmail(email, password)
        .then((user) => {
            setUser(user);
            setState(InitializeState);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // view password when user click on eye icon
    const [type, setType] = useState('password');

    const handleViewPassword = () => {
        if (type === 'password') {
            setType('text');
        } else {
            setType('password');
        }
    }
    
    return(
        <div>
            <h1 className='title-login'>Login</h1>
            <div className="login-page">
                <div className="form-login">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label> <br/>
                        <input type="email" name="email" placeholder='Enter your email' className="input-login" id="email" value={email} onChange={handleChange}/>
                        <br/>
                        <label htmlFor="password">Password</label>
                        <span className='eyeIcon'> <EyeOpenIcon className="icon-eye" onClick={handleViewPassword} /></span>
                         <br/>
                        <input name="password" placeholder='Enter your password' className="input-login" type={type} id="password" value={password} onChange={handleChange}/>
                        
                        <div className="login-sub">
                            <button type="submit" className="btn-login">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;