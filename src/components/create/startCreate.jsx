import React, { useEffect } from 'react';
import Navbar from '../navbar/navbar';
import { Button, AddIcon, Pane, Badge, DocumentIcon, MoreIcon, Dialog, toaster, SortIcon, ManualIcon, SideSheet  } from 'evergreen-ui';
import Login from '../login/login';
import { getUserData, isLogin } from '../share/authService';
import {getFirestore, doc, getDoc, setDoc, getDocs, collection} from 'firebase/firestore';
import './startCreate.css';
import { recieveValue, shareValue } from '../share/APIService';
// import { getIdToken } from 'firebase/auth';
function StartCreate(){
    const [isShown, setIsShown] = React.useState(false);
    const [isShown2, setIsShown2] = React.useState(false);
    const [nameCv, setNameCv] = React.useState('');
    const [cvId, setCvId] = React.useState([]);
    const [showState, setShowState] = React.useState(false);
    const handleCreate = async () => {
        const docId = Date.now().toString();
        if(nameCv === ''){
            // it will set the input to red border
            document.getElementById('nameCv').style.border = '2px solid red';
            toaster.danger('Please enter a name for your CV');
        }else{
            // if user is logged in, save cv to database and after that push docid to user's cvIds array
            if(isLogin()){
                const db = getFirestore();
                const docRef = doc(db, "cells", docId, "information", docId);
                await setDoc(docRef, {
                    name: nameCv,
                    docId: docId,
                    createdAt: new Date().toLocaleDateString()
                });
                // recieveValue(docId);
                updateProfile(docId);
                
            }
            else{
                setIsShown2(true);

            }
        }
        
    }

    const updateProfile = async (docid) => {
        const db = getFirestore();
        const idToken = await getUserData();
                const docRef2 = doc(db, "profiles", idToken);
                const docSnap = await getDoc(docRef2);
                if (docSnap.exists()) {
                    // console.log("Document data nè:", docSnap.data());
                    const cvIds = docSnap.data().cvIds;
                    cvIds.push(docid);
                    await setDoc(docRef2, {
                        // name,
                        // email,
                        // imageUrl,
                        // walletAddress,
                        // bio: '',
                        // CreateAt: new Date(),
                        name: docSnap.data().name,
                        email: docSnap.data().email,
                        imageUrl: docSnap.data().imageUrl,
                        walletAddress: docSnap.data().walletAddress,
                        bio: docSnap.data().bio,
                        CreateAt: docSnap.data().CreateAt,
                        cvIds: cvIds
                    });
                    setIsShown(true);
                    console.log('update profile success');
                    window.location.href = '/create/'+ docid;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

    }

    // get all cvId of user 
    // from CvId array, get all cv name and createAt at Cells collection and push to cvPushed array
    // then render cvPushed array
    const [cvList, setCvList] = React.useState([]);
    const getCv = async () => {
        const db = getFirestore();
        const idToken = await getUserData();
        const docRef = doc(db, "profiles", idToken);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data nè:", docSnap.data());
            const cvIds = docSnap.data().cvIds;
            const cvPushed = [];
            for(let i = 0; i < cvIds.length; i++){
                const docRef2 = doc(db, "cells", cvIds[i], "information", cvIds[i]);
                const docSnap2 = await getDoc(docRef2);
                if (docSnap2.exists()) {
                    // console.log("Document data nè:", docSnap2.data());
                    cvPushed.push(docSnap2.data());
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            console.log('get cv success');
            // console.log(cvPushed);
            return cvPushed;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const showCell = async () => {
        getCv().then((res) => {
            console.log('aaaaaa');
            setCvList(res);
        });
        console.log(cvList);
        setShowState(true);
    }

    // get docid and link to create page
    const handleEdit = (docid) => {
        window.location.href = '/create/'+ docid;
    }

    const [dataList, setDataList] = React.useState(null);
    const [isShowView, setIsShowView] = React.useState(false);

    const handleview = async (docid) => {
        
        // get all document in cells collection
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "cells", docid, "elements"));
        const data = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
            setDataList(data);
            });
            console.log(dataList);
             setIsShowView(true);
    }

    
    return(
        <div>
            <Navbar />
            <div className='start-create'>
                {/* <button onClick={()=>getCvId()}>Get cvId</button><br/> */}
                <Button appearance="primary" marginY={12} marginRight={12} iconBefore={AddIcon} onClick={() => setIsShown(true)}>
                    Create new your CV
                </Button>
                <Dialog
                    isShown={isShown}
                    title="Create a new CV"
                    onCloseComplete={() => setIsShown(false)}
                    confirmLabel="Confirm Create"
                    onConfirm={handleCreate}
                    >
                    <input type="text" id="nameCv" placeholder="Enter title" className='title-create-cv' onChange={(e) => setNameCv(e.target.value)} />
                    
                </Dialog>
                <Dialog className='dialog-login' isShown={isShown2} onCloseComplete={() => setIsShown2(false)} hasFooter={false} hasHeader={false}><Login /></Dialog>
                <div className='Preview-content'>
                    <div className='title-preview'>
                        
                        <Pane className='pane-content'>
                            <Badge color="neutral" marginRight={8}>
                                Skill
                            </Badge>
                            <Badge color="green" marginRight={8}>
                                Achievement
                            </Badge>
                            <Badge color="blue" marginRight={8}>
                                Experience
                            </Badge>
                            <Badge color="red" marginRight={8}>
                                Education
                            </Badge>
                            <Badge color="purple" marginRight={8}>
                                Certificate
                            </Badge>
                            <Badge color="yellow" marginRight={8}>
                                Activity
                            </Badge>
                        </Pane>
                        <h2>Preview  
                            <SortIcon className='sort-icon' onClick={() => showCell()} />
                        </h2>
                    </div>
                    <div className='content-preview'>
                        {/* generate a cv array from getCv on UI */}
                        {cvList.map((cv, index) => (
                            <div className='content-card' key={index}>
                                <h4 className='title-card-render' >{cv.name}</h4>
                                <DocumentIcon size={100} color="info" className='icon-doc' />
                                <br></br>
                                <Button appearance="primary" marginY={12}  marginRight={12} className="btn-tab"  onClick={()=>handleEdit(cv.docId)}>Improve</Button>
                                <Button intent="none" iconBefore={ManualIcon} marginY={12} className="btn-tab"  marginRight={12} onClick={()=>handleview(cv.docId)}>View</Button>
                                <div className='header-card'>
                                    <MoreIcon size={20} color="info" className='icon-more' />
                                </div>
                            </div>
                        ))}

                        <React.Fragment>
                            <SideSheet isShown={isShowView} onCloseComplete={() => setIsShowView(false)}>
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
                               
                                {/* <ul>
                                <li>
                                    <span>3rd January 2020</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>21st Jun 2019</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>15th April 2018</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>22nd Mars 2017</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>22nd Mars 2017</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>22nd Mars 2017</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>22nd Mars 2017</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>22nd Mars 2017</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                    </p>
                                    </div>
                                </li>
                                <li>
                                    <span>22nd Mars 2017</span>
                                    <div class="content">
                                    <h3>What Is Lorem Ipsum?</h3>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.
                                    </p>
                                    </div>
                                </li>
                                </ul> */}
                            </div>
                            </SideSheet>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartCreate;