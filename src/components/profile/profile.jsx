import React, { useEffect, useState } from 'react';
import './profile.css';
import {getDoc, getFirestore, doc, updateDoc} from 'firebase/firestore';
import { toaster, Avatar, WarningSignIcon, EditIcon, Dialog, FileUploader, FileCard, Tooltip, Button, ShareIcon, ClipboardIcon } from 'evergreen-ui';
import QRCode from 'react-qr-code';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Navbar from '../navbar/navbar';
function Profile(){

    // get id from url
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    const [userData, setUserData] = useState(null);
    const [cvList, setCvList] = useState([]);

    // get user profiles from firebase

    const getUserData = async () => {
        const db = getFirestore();
        const docRef = doc(db, "profiles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUserData(docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            toaster.danger("No such document!");
        }

        // await userData 

        // get cv list from firebase
        const cvListTam = [];
        docSnap.data().cvIds.forEach(async (cvId) => {
            const docRef2 = doc(db, "cells", cvId, "information", cvId)
            const docSnap2 = await getDoc(docRef2);
            if (docSnap2.exists()) {
                console.log("Document data CV:", docSnap2.data());
                cvListTam.push(docSnap2.data());
                // push to cvList
                console.log(cvListTam);
                setCvList([...cvListTam]);
                
            } else {
                // doc.data() will be undefined in this case
                toaster.danger("No such document!");
            }
        });
        
        console.log(cvList);
        

    }

    // when pointer is on avatar, show edit icon
    const [isShown, setIsShown] = useState(false);
    const [bio, setBio] = useState('');

    // only update bio when user click save
    const updateBio = () => {
        // update bio in firebase
        const db = getFirestore();
        const docRef = doc(db, "profiles", id);
        updateDoc(docRef, {
            bio: bio
        }).then(() => {
            toaster.success("Update bio successfully!");
        }
        ).catch((error) => {
            toaster.danger("Update bio failed!");
        });
        setIsShown(false);
        getUserData();
        // reload page
        // window.location.reload();
    }

    const [isShown2, setIsShown2] = useState(false);

    const [files, setFiles] = React.useState([])
    const [fileRejections, setFileRejections] = React.useState([])
    const handleChange = React.useCallback((files) => setFiles([files[0]]), [])
    const handleRejected = React.useCallback((fileRejections) => setFileRejections([fileRejections[0]]), [])
    const handleRemove = React.useCallback(() => {
      setFiles([])
      setFileRejections([])
    }, [])
    // const [imageUrl, setImageUrl] = useState('');

    const uploadImage = async () => {
        // upload image to firebase storage with name of image
        const storage = getStorage();
        const storageRef = ref(storage, files[0].name);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        uploadTask.on('state_changed',
        (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            console.log(error);
            // Handle unsuccessful uploads
            toaster.danger("Upload image failed!");
        }, async () => {
            // get storage image upload url
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                // update image url in firebase
                const db = getFirestore();
                const docRef = doc(db, "profiles", id);
                updateDoc(docRef, {
                    imageUrl: downloadURL
                }).then(() => {
                    toaster.success("Update image successfully!");
                    setIsShown2(false);
                    getUserData();
                }
                ).catch((error) => {
                    toaster.danger("Update image failed!");
                    setIsShown2(false);
                });
              });
        });
    }



    useEffect(() => {
        getUserData();
    }, []);

    const [copyCV, setCopyCV] = useState('');
    const [isShown3, setIsShown3] = useState(false);
    const getCopyCV = (cvId) => {
        setCopyCV(cvId);
        setIsShown3(true);
    }

    const copyToClipboard = () => {
        // copy url of domain/view/cvId to clipboard
        navigator.clipboard.writeText(`https://do-an-cn-a.vercel.app/view/${copyCV}`);
        toaster.success("Copy to clipboard successfully!");
        // setIsShown3(false);
        
    }

   

    return(
        <div className="profile">
            <Navbar />
            <div className="profile-header">
                {/* when pointer to avatar, show edit avatar */}
                    <div className="profile-avatar">
                    <Avatar
                        size={190}
                        src={userData?.imageUrl}
                        name={userData?.name}
                        className="avatar-user"/>
                    </div>

                {/* <span className='span-space'></span> */}
                <div className="profile-name">
                    <h1 className="profile-name-user">{userData?.name}</h1>
                </div>
                <div className="create-new">
                    <button className="create-new-btn" onClick={() => window.location.href = "/startcreate"}>Create a new CV</button>
                </div>
            </div>
            <div className="profile-body">
                <div className="profile-body-left">
                    <div className="profile-info-box">
                        <label className="profile-body-left-label">Email</label>
                        <p>{userData?.email}</p>
                        <br/>
                        <label className="profile-body-left-label">Bio</label>
                        {/* set is show true when click this icom */}
                        <EditIcon className="edit-icon" size={18} color="info" onClick={() => setIsShown(true)}/>
                        <p>{userData?.bio}</p>
                        <br/>
                        <label className="profile-body-left-label">MetaMask wallet address</label>
                        <p>{userData?.walletAddress}</p>
                        <div className="profile-body-left-button">
                            <button className="profile-body-left-btn" onClick={() => setIsShown2(true)}>Change avatar</button>
                            {/* <input type="file" id="file" className="input-file" onChange={(e) => setFiles(e.target.files[0])}/>
                            <button className="profile-body-left-btn" onClick={() => uploadImage()}>Save</button> */}
                        </div>
                    </div>
                </div>
                <div className="profile-body-right">
                    {
                       cvList.length > 0 ? cvList.map((cv, index) => {
                            return(
                                 <div className="profile-body-right-cv" key={index}>
                                    
                                   
                                    {/* link to view */}
                                    <table className="table-cv">
                                        <tbody>
                                        <tr>
                                            <td className='column-table'>
                                            <p>title: {cv.name}</p>
                                            </td>
                                            <td className='column-table-1'>
                                            <p>create at: {cv.createdAt}</p>
                                            </td>
                                            <td className='column-table-2'>
                                            <a href={`/view/${cv.docId}`} className="profile-body-right-cv-link">View</a>
                                            <Button className="profile-body-right-cv-btn" iconBefore={ShareIcon} appearance="primary" onClick={() => getCopyCV(cv.docId)}>Share</Button>
                                            </td>

                                        </tr>
                                        </tbody>

                                    </table>
                                 </div>
                            )
                          }
                          ) : 
                          <div className="warning-no">
                            <WarningSignIcon className="warning-icon" size={70} color="warning" title='No any CV'/>
                            <h4>No have any CV </h4>
                          </div>
                          

                    }
                    
                </div>
            </div>
            <Dialog
                isShown={isShown}
                title="Update bio"
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Update"
                onConfirm={() => updateBio()}
            >
                <div className="dialog-body">
                    {/* update bio from old data */}
                    <textarea className="dialog-textarea" defaultValue={userData?.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
            </Dialog>
            <Dialog
                isShown={isShown2}
                title="Change avatar"
                onCloseComplete={() => setIsShown2(false)}
                confirmLabel="Upload this image"
                onConfirm={() => uploadImage()}
            >
                <div className="dialog-body">
                <FileUploader
                    label="Upload File"
                    description="You can upload 1 file. File can be up to 50 MB."
                    maxSizeInBytes={50 * 1024 ** 2}
                    maxFiles={1}
                    onChange={handleChange}
                    onRejected={handleRejected}
                    renderFile={(file) => {
                    const { name, size, type } = file
                    const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file)
                    const { message } = fileRejection || {}
                    return (
                        <FileCard
                        key={name}
                        isInvalid={fileRejection != null}
                        name={name}
                        onRemove={handleRemove}
                        sizeInBytes={size}
                        type={type}
                        validationMessage={message}
                        />
                    )
                    }}
                    values={files}
                />
                </div>
            </Dialog>
            <Dialog
                isShown={isShown3}
                title="Share CV"
                onCloseComplete={() => setIsShown3(false)}
                hasFooter={false}
            >
                <div className="dialog-body">
                    
                    <div className="dialog-body-link">
                        <p>Copy this link to share your CV</p>
                        <div className="dialog-body-link-text">
                            <input className="dialog-input" value={`http://localhost:3000/view/${copyCV}`} readOnly/>
                            <div className="clipboard-icon">
                                <ClipboardIcon  size={20} color="info" onClick={() => copyToClipboard()} Style="cursor: pointer;"/>
                            </div>
                        </div>
                        <br/>
                        <QRCode value={`http://localhost:3000/view/${copyCV}`} 
                        size={200}
                        Style="margin: 0 auto;"/>

                        
                    </div>
                    

                </div>
            </Dialog>
        </div>
    )

}

export default Profile;