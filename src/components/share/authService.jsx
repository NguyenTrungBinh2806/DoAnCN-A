import React from 'react';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {Alert, toaster} from 'evergreen-ui';

    const auth = getAuth();
    // login with email and password, if success, it will redirect to create page and save token to local storage, else alert error
    const loginWithEmail = async (email, password) => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.uid);
            console.log(user.uid);
            // how to do redirect which is not reload page
            window.location.href = '/create';
        }catch(error){
            if(error.code === 'auth/user-not-found'){
                toaster.danger('User not found');
            }
            if(error.code === 'auth/wrong-password'){
                toaster.warning('Wrong password');
            }
        }

    }
    // get id token from local storage
    const getUserData = async () => {
        const token = localStorage.getItem('token');
        return token;
    }

    
    // logout and remove token from local storage
    const logout = async () => {
        try{
            await auth.signOut();
            localStorage.removeItem('token');
            window.location.href = '/';
        }catch(error){
            console.log(error);
        }
    }

    // check the state of user, if user is login, it will return true, else return false
    const isLogin = () => {
        if(localStorage.getItem('token')){
            return true;
        }else{
            return false;
        }
    }

export { loginWithEmail, getUserData, logout, isLogin };