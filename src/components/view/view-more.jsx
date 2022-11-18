import React from 'react';
import './view-more.css';
import Navbar from '../navbar/navbar';
// import firestore and query
import {getFirestore, doc, getDoc, setDoc, getDocs, collection, query} from 'firebase/firestore';

function ViewMore() {

    // cut id param from url
    const url = window.location.href;
    
    
    // check id in cvIds of profile in firebase
    // if id is in cvIds, get this profile

    const [userData, setUserData] = React.useState(null);

    const checkIdParam = async () => {
        const db = getFirestore();
        const q = query(collection(db, "profiles"));
        const id = url.substring(url.lastIndexOf('/') + 1);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.cvIds.includes(id)) {
                setUserData(data);
            }
        });
        console.log(userData);
    }

    const [dataList, setDataList] = React.useState(null);
    const handleview = async () => {
        const id = url.substring(url.lastIndexOf('/') + 1);
        // get all document in cells collection
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "cells", id, "elements"));
        const data = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
            setDataList(data);
            });
            console.log(dataList);
    }

    // run checkIdParam and handleview when page is loaded
    React.useEffect(() => {
        checkIdParam();
        handleview();
    }, []);

    
  


    return (
        <div className='view-more'>
            <Navbar />
            
            <div className='view-more-content'>
                <div className='view-more-content-left'>
                    {
                        userData ? (
                            <div className='user-data-view'>
                                <img src={userData.imageUrl} alt='user' className='user-image-view'/>
                                <h2>{userData.name}</h2>
                                <br/>
                                <div className="user-info-view">
                                    <h3>Bio:</h3>
                                    <p>{userData.bio}</p>
                                    <h3>Contact</h3>
                                    <p>{userData.email}</p>

                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }
                
                </div>
                <div className='view-more-content-right'>
                        <div className="timeline">
                                {/* show dataList */}
                                <ul>
                                {dataList && dataList.map((data, index) => (
                                    
                                        <li key={index}>
                                            <span>{data.createdAt}</span>
                                            <div className="content">
                                            <h3>{data.type}</h3>
                                            <div className='list-data-type'>
                                                    {data.data.map((item, index) => (
                                                        <p key={index} className="item-list">{item}</p>
                                                    ))}
                                            </div>
                                            <h4>transaction hash: {data.txh}</h4>
                                            </div>
                                        </li>
                                        
                                    
                                ))}
                                </ul>
                               
                               
                            </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMore;