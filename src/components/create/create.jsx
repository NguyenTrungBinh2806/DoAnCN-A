import React, {useEffect, useState} from 'react';
import './create.css';
import Navbar from '../navbar/navbar';
// import menu from evergreen ui
import { Menu } from 'evergreen-ui';
import renderField from './render';
import {  doc, getDoc, getFirestore } from "firebase/firestore";
import db from '../../environment/firebase';
function CreateCV() {
        const [selectedField, setSelectedField] = React.useState('asc')
       
        const [valueList, setValueList] = useState([]);
       

        // const { getSkillList, getExperineceList, getCertificateList, getAchievementList, getActivityList, getEducationList } = render();
        // when click skill field, it will show the skill form field in the right side
        const handleFieldClick = (field) => {
            setSelectedField(field);
        }

        const [idParam, setIdParam] = useState('');
    //    cut id params from url
        const cutIdParam = () => {
            const url = window.location.href;
            const id = url.split('/')[4];
            console.log(id);
            setIdParam(id);
        }
        
        const [cvData, setCvData] = useState({});

        useEffect(() => {
            cutIdParam();
            const getInformation = async () => {
                const db = getFirestore();
                const docRef = doc(db, "cells", idParam, "information", idParam);
                const docSnap = await getDoc(docRef);
                console.log('a');
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setCvData(docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            getInformation();
        }, [idParam])
               




        return(
            <div className='create-cv'>
                <Navbar />
                <button onClick={cutIdParam}>cut id</button>
                <div className='cv-content'>
                    <div className='left-content'>
                    <Menu className='menu'>
                        <h3 className='title'>Content</h3>
                        <hr/>
                        <Menu.OptionsGroup
                            options={[
                            { label: 'Skill', value: 'Skill', onClick: () => (handleFieldClick('Skill')) },
                            { label: 'Experinece', value: 'Experience', onClick: () => handleFieldClick('Experience') },
                            { label: 'Certificate', value: 'Certificate', onClick: () => handleFieldClick('Certificate') },
                            { label: 'Achievement', value: 'Achievement', onClick: () => handleFieldClick('Achievement') },
                            { label: 'Activity', value: 'Activity', onClick: () => handleFieldClick('Activity') },
                            { label: 'Education', value: 'Education', onClick: () => handleFieldClick('Education') },
                            { label: 'Other information', value: 'Other information', onClick: () => handleFieldClick('Other_information') },
                            ]}
                            selected={selectedField}
                            onChange={(selected) => setSelectedField(selected)}
                            
                        />
                    </Menu>
                    </div>
                    <div className='right-content'>
                        <div className='left'>
                           {renderField(selectedField)}
                        </div>
                        <div className='right'>
                            <h2>infromation CV</h2>
                            <hr/>
                            <div className='information'>
                                <div className='information-item'>
                                    <label className='label-cv'>CV name: </label>
                                    <p>{cvData.name}</p>
                                    <label className='label-cv'>Created at: </label>
                                    <p>{cvData.createdAt}</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default CreateCV;