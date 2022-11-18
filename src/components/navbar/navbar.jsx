import React, { Component, useEffect } from 'react';
import { SideSheet, Paragraph, Avatar } from 'evergreen-ui';
import Register from '../register/register';
import Login from '../login/login';
import { Dialog, Popover, Menu, Position } from 'evergreen-ui';
// import PeopleIcon with evergreen-ui
import { LogInIcon, AddIcon, PeopleIcon, EyeOpenIcon, LogOutIcon, TrashIcon } from 'evergreen-ui'
import { isLogin, getUserData, logout } from '../share/authService';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import './navbar.css'
function Navbar() {
   
    const [isShown, setIsShown] = React.useState(false)
    const [isShown2, setIsShown2] = React.useState(false)
    const [isShown3, setIsShown3] = React.useState(false)

    // if user is logged in, show avatar and Name, else show login and register button
    const [isLoginState, setIsLoginState] = React.useState(false);
    const [userData, setUserData] = React.useState('');
    const [userInfo, setUserInfo] = React.useState(null);
    
    useEffect(() => {
        const getInformation = async () => {
            const db = getFirestore();
            const docRef = doc(db, "profiles", userData);
            const docSnap = await getDoc(docRef);
            console.log('a');
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUserInfo(docSnap.data());

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (isLogin()) {
            setIsLoginState(true);
            const data = localStorage.getItem("token");
            setUserData(data);
              
            getInformation();
            // getUserDataFromLocalStorage();
        } else {
            setIsLoginState(false);
        }
    }, [userData])
    const handleLogout = () => {
        logout();
        setIsLoginState(false);
        setUserData(null);
    }
        return(
             <div className='navbar'>
                <div className='content-link'>
                    <a href='/' className='link'>Home</a>
                    <a href='/startcreate' className='link'>Create CV</a>
                    <a href='/view' className='link'>View CV</a>
                    <span className='span'/>
                        {/* if user is logged in, show avatar and Name, else show login and register button  */}
                        {isLoginState ? (
                            <div className='info'>
                                <Avatar key={userInfo?.name} name={userInfo?.name} size={40} />
                                <Popover
                                    position={Position.BOTTOM_LEFT}
                                    content={
                                        <Menu>
                                        <Menu.Group>
                                            <Menu.Item icon={PeopleIcon}> your information</Menu.Item>
                                            <Menu.Item icon={EyeOpenIcon}>view your CV</Menu.Item>
                                        </Menu.Group>
                                        <Menu.Divider />
                                        <Menu.Group>
                                            <Menu.Item icon={LogOutIcon} intent="danger" onSelect={() =>  setIsShown3(true)}>
                                            Logout...
                                            </Menu.Item>
                                        </Menu.Group>
                                        </Menu>
                                    }>
                                        <span className='name' key={userInfo?.name}>{userInfo?.name}</span>
                                    </Popover>
                                    <Dialog
                                        isShown={isShown3}
                                        title="Confirm Logout"
                                        intent="danger"
                                        onCloseComplete={() => setIsShown3(false)}
                                        onConfirm={handleLogout}
                                        confirmLabel="Logout"
                                        >
                                        <Paragraph>Are you sure you want to logout?</Paragraph>
                                    </Dialog>
                            </div>
                        ) : (
                            <div className='info'>
                                <Avatar name='Login' size={40} />
                                
                                <Popover
                                    position={Position.BOTTOM_LEFT}
                                    content={
                                        <Menu>
                                        <Menu.Group>
                                            <Menu.Item icon={LogInIcon} onSelect={() => setIsShown2(true)}> Login your account</Menu.Item>
                                            <Menu.Item icon={AddIcon} onSelect={() => setIsShown(true)}> Register new account</Menu.Item>
                                        </Menu.Group>
                                        </Menu>
                                    }>
                                        <span className='name'>Login</span>
                                    </Popover>
                                    <Dialog className='dialog-login' isShown={isShown2} onCloseComplete={() => setIsShown2(false)} hasFooter={false} hasHeader={false}><Login /></Dialog>
                                    <Dialog className='dialog-login' isShown={isShown} onCloseComplete={() => setIsShown(false)} hasFooter={false} hasHeader={false}><Register /></Dialog>
                            </div> 
                        )}

                </div>

              
             </div>
        )
}
export default Navbar;