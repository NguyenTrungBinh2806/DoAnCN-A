import React, { useState} from 'react';
import './view.css';
import Navbar from '../navbar/navbar';
import { SearchIcon, WarningSignIcon } from 'evergreen-ui';
import db from '../../environment/firebase';
import {getFirestore, doc, getDoc, setDoc, getDocs, collection} from 'firebase/firestore';
function ViewCV(){
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchState, setSearchState] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        const db = getFirestore();
        console.log(search);
        const docid = search.toString();
        const Snapshot = doc(db, "cells",  docid, "information",  docid);
        const docSnap = await getDoc(Snapshot);
        const dataTam = [];
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            dataTam.push(docSnap.data());
            setData(dataTam);
            setLoading(false);
            setSearchState(true);
            console.log(data);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");

        }
        setLoading(false);

    }

    const [tabs] = useState(['Search by ID', 'Search by content']);

    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    }

    const viewMore = (id) => {
        window.location.href = `/view/${id}`;
    }

    // =====================================
    // View CV by content
    // =====================================
    const [searchContent, setSearchContent] = useState('');
    const [dataContent, setDataContent] = useState(null);
    const [loadingContent, setLoadingContent] = useState(false);
    const [searchStateContent, setSearchStateContent] = useState(false);

    const handleSearchContent = async (e) => {
        e.preventDefault();
        const db = getFirestore();
        
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const dataTam = [];
       
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dataTam.push(doc.data().cvIds);
        });
         // biến mảng nhiều chiều thành mảng 1 chiều
         const dataTam3 = [];
        const dataTam2 = dataTam.flat();
        setDataContent([]);
        dataTam2.forEach(async (id) => {
            const docRef = await getDocs(collection(db, "cells", id, "elements"));
            docRef.forEach(async (doc) => {
                // search gần đúng với data trong elements collection và lấy ra tập data của mà gần đúng
                if(doc.data().data.toString().toLowerCase().includes(searchContent.toString().toLowerCase())){
                    // push docidCell field in to doc.data()
                    const dataTam4 = doc.data();
                    dataTam4.docidCell = id;

                    // push infor user from dataTam 2 to dataTam 4
                    const docRef3 = getDocs(collection(db, "profiles"));
                    for(const doc of (await docRef3).docs){
                        if(doc.data().cvIds.includes(id)){
                            dataTam4.name = doc.data().name;
                            dataTam4.imageUrl = doc.data().imageUrl;
                        }
                    }


                    dataTam3.push(dataTam4);
                    // dataTam3.push(doc.data());
                    // from id to get user data has id in cvIds
                     

                }
                if(dataTam3.length > 0){
                    setLoadingContent(false);
                    setSearchStateContent(true);
                    setSearchContent('');
                }
                else if(dataTam3.length === 0){
                    setLoadingContent(false);
                    setSearchStateContent(false);
                    setSearchContent('');
                }
                if(searchContent === ''){
                    setLoadingContent(false);
                    setSearchStateContent(false);
                    setSearchContent('');
                }
            })
            
        })
        console.log(dataTam3);
        setDataContent(dataTam3);
        // console.log(dataContent);
    }

    return (
        <div className="view">
            <Navbar />
            {/* <button onClick={handleSearchContent}>Search</button> */}
               {/* search icon in input field */}
                {/* <form onSubmit={handleSearch}>
                    <label htmlFor="search" className='label-search'>Search</label>
                    <br/>
                    <input type="text" placeholder="Search..." className="input-search"/> 
                    <button type="submit" className="btn-search">
                        <SearchIcon size={14} color="white" className="icon-search"/>Search 
                    </button>
                </form> */}
                {/* Create a tab view */}
                <div className="tab-view">
                    <div className="tab-view-items">
                        {tabs.map((tab) => (
                            <div
                                key={tab}
                                className="btn-tab-view-item"
                                onClick={() => handleTabChange(tab)}
                                // set style underline for active tab, color for inactive tab
                                style={{ borderBottom: selectedTab === tab ? '4px solid #2f80ed' : 'none' 
                                // active tab color
                                , color: selectedTab === tab ? '#2f80ed' : '#000000' }}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                    <div className="tab-view-content">
                        {
                            selectedTab === 'Search by ID' ? (
                                <div className="search-by-cv">
                                    <form onSubmit={handleSearch}>
                                        {/* <label htmlFor="search" className='label-search'>Search</label> */}
                                        <h1>Search by ID</h1>
                                        <input type="text" placeholder="Search..." className="input-search" onChange={(e) => setSearch(e.target.value)}/>
                                        <button type="submit" className="btn-search">
                                            <SearchIcon size={14} color="white" className="icon-search"/>Search
                                        </button>
                                    </form>
                                    {
                                        loading ? (
                                            <div className="loading">
                                                <h1>Loading...</h1>
                                            </div>
                                        ): (
                                            <div className="search-result">
                                                {
                                                    searchState ? (
                                                        <div className="search-result-content">
                                                            <h3>Search result</h3>
                                                            <div className="search-result-content-items">
                                                                {
                                                                    data.map((item, index) => (
                                                                        <div className="search-result-content-item" key={index}>
                                                                                <p className='search-result-text-id'>{item.docId}</p>
                                                                                <p className='search-result-text'>{item.name}</p>
                                                                                <p className='search-result-text'>{item.createdAt}</p>
                                                                                <div className="search-result-content-item-btn">
                                                                                    <button className="btn-download" onClick={() => viewMore(item.docId)}>View more...</button>
                                                                                </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    ): (
                                                        <div className="search-result-content">
                                                            <h3>Search result</h3>
                                                            <div className="search-result-content-items-no">
                                                                <WarningSignIcon size={30} color="red" className="icon-search"/>
                                                                <h4 className="no-result">No result</h4>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="search-by-content">
                                    <h1>Search by content</h1>
                                    <input type="text" placeholder="Search..." className="input-search" onChange={(e) => setSearchContent(e.target.value)}/>
                                    <button type="submit" className="btn-search" onClick={handleSearchContent}>Search</button>
                                    {
                                        loadingContent ? (
                                            <div className="loading">
                                                <h1>Loading...</h1>
                                            </div>
                                        ): (
                                            <div className="search-result">
                                                {
                                                    searchStateContent ? (
                                                        <div className="search-result-content">
                                                            <h3>Search result</h3>
                                                            <div className="search-result-content-items-2">
                                                                {
                                                                    // generate dataContent is an array of objects
                                                                    dataContent.map((item, index) => (
                                                                       
                                                                        <div className="card-search-content" key={index}>
                                                                            <div className="author-infor">
                                                                                <img src={item.imageUrl} alt="avatar" className="avatar-author"/>
                                                                                <p>{item.name}</p>
                                                                            </div>
                                                                            <div className="card-search-content-header">
                                                                                <h3>{item.type}</h3>
                                                                            </div>
                                                                            <hr/>
                                                                            <div className="card-search-content-body">
                                                                                {
                                                                                    item.data.map((item2, index2) => (
                                                                                        <ul key={index2}>
                                                                                            <li>{item2}</li>
                                                                                        </ul>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                            <button className="btn-download-content" onClick={() => viewMore(item.docidCell)}>View more...</button>
                                                                            <hr/>
                                                                            <div className="card-search-content-footer">Craeted at: {item.createdAt}</div>
                                                                        </div>
                                                                    ))  
                                                                }
                                                            </div>
                                                        </div>
                                                    ): (
                                                        <div className="search-result-content">
                                                            <h3>Search result</h3>
                                                            <div className="search-result-content-items-no">
                                                                <WarningSignIcon size={30} color="red" className="icon-search"/>
                                                                <h4 className="no-result">No result</h4>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
    );

}

export default ViewCV;