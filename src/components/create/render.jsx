import React, { useState, useEffect } from "react";
import db from "../../environment/firebase";
import { collection, getDocs, doc, setDoc, getDoc} from "firebase/firestore";
import { Badge, Pane, Dialog, toaster } from "evergreen-ui";
import { getUserData } from "../share/authService";
import "./render.css";
function renderField(field) {
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [skillList, setSkillList] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ExperineceList, setExperineceList] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [CertificateList, setCertificateList] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [AchievementList, setAchievementList] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ActivityList, setActivityList] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [EducationList, setEducationList] = useState([]);


  // get all skills from database
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getSkillList = async () => {
    const skillList = [];
    const skillRef = collection(db, "skills");
    const skillSnapshot = await getDocs(skillRef);
    skillSnapshot.forEach((doc) => {
      skillList.push(doc.data());
    });
    setSkillList(skillList);
    console.log(skillList);
    
  };
  const getExperineceList = async () => {
    const ExperineceList = [];
    const ExperineceRef = collection(db, "experiences");
    const ExperineceSnapshot = await getDocs(ExperineceRef);
    ExperineceSnapshot.forEach((doc) => {
      ExperineceList.push(doc.data());
    });
    setExperineceList(ExperineceList);
    console.log(ExperineceList);
  };
  const getCertificateList = async () => {
    const CertificateList = [];
    const CertificateRef = collection(db, "certificates");
    const CertificateSnapshot = await getDocs(CertificateRef);
    CertificateSnapshot.forEach((doc) => {
      CertificateList.push(doc.data());
    });
    setCertificateList(CertificateList);
    console.log(CertificateList);
  };
  const getAchievementList = async () => {
    const AchievementList = [];
    const AchievementRef = collection(db, "achievements");
    const AchievementSnapshot = await getDocs(AchievementRef);
    AchievementSnapshot.forEach((doc) => {
      AchievementList.push(doc.data());
    });
    setAchievementList(AchievementList);
    console.log(AchievementList);
  };
  const getActivityList = async () => {
    const ActivityList = [];
    const ActivityRef = collection(db, "Activities");
    const ActivitySnapshot = await getDocs(ActivityRef);
    ActivitySnapshot.forEach((doc) => {
      ActivityList.push(doc.data());
    });
    setActivityList(ActivityList);
    console.log(ActivityList);
  };
  const getEducationList = async () => {
    const EducationList = [];
    const EducationRef = collection(db, "educations");
    const EducationSnapshot = await getDocs(EducationRef);
    EducationSnapshot.forEach((doc) => {
      EducationList.push(doc.data());
    });
    setEducationList(EducationList);
    console.log(EducationList);
  };
  //useEffect 

  
  // run when the page is loaded

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getSkillList();
    getExperineceList();
    getCertificateList();
    getAchievementList();
    getActivityList();
    getEducationList();
  }, []);


  // const valueList = [];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [valueList, setValueList] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [valueList2, setValueList2] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [valueTam, setValueTam] = useState("");

  // add value to valueList
  const addValue = (e) => {
    setValueList([...valueList, e.target.value]);
    // console.log(valueList);
  };

  // remove value from valueList
  const removeValue = (e) => {
    const index = valueList.indexOf(e.target.value);
    if (index > -1) {
      valueList.splice(index, 1);
    }
    setValueList([...valueList]);
    console.log(valueList);
  };

  const addInput = () => {
    setValueList2([...valueList2, valueTam]);
    setValueTam("");
    // console.log(valueList2);
  }

  // remove input fields dynamically in react js
  const removeInput = (index) => {
    valueList2.splice(index, 1);
    setValueList2([...valueList2]);
  }

  // Biến tổng hợp để submit
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [valueList3, setValueList3] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShown, setIsShown] = useState(false);
  const submit = () => {
    const valueListTam = [];
    for (let i = 0; i < valueList.length; i++) {
      valueListTam.push(valueList[i]);
    }
    for (let i = 0; i < valueList2.length; i++) {
      valueListTam.push(valueList2[i]);
    }
    setValueList3(valueListTam);
    setIsShown(true);
    console.log( valueList3);
  }

  // check if valueList.length > 0 or valueList2.length > 0 then show button submit
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isShown2, setIsShown2] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (valueList.length > 0 || valueList2.length > 0) {
      setIsShown2(true);
      console.log("true");
    } else {
      setIsShown2(false);
      console.log("false");
    }
  }, [valueList, valueList2]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [id, setId] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [txh, setTxh] = useState("");
 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [idToken, setIdToken] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [stateValue, setStateValue] = useState(false);
  const checkIdParam = async (id) => {
    // get id token
    const idToken = await localStorage.getItem('token');
    // print id token
    console.log(idToken);
    // get user cvids from firestore and check if id param is in cvids
    const cvidsRef = doc(db, "profiles", idToken);
    const cvidsSnapshot = getDoc(cvidsRef);
    cvidsSnapshot.then(async (doc) => {
      if (doc.exists()) {
        const cvids = doc.data().cvIds;
        console.log(cvids);
        // doc is not a function
        if (cvids.includes(id)) {
          addCells(id);
        } else {
          alert("Bạn không có quyền truy cập");
        }
      } else {
        alert("Bạn không có quyền truy cập");
      }
    });


  };
  const addCells = async (ids) => {
    // cut id param
    // const ids = window.location.href.split("/")[4];
    const docid = Date.now().toString();
    const cellsRef = doc(db, "cells", ids, "elements", docid);
    await setDoc(cellsRef, {
      id: docid,
      type: field,
      data: valueList3,
      txh: txh,
      createdAt: new Date().toLocaleString(),
    });
    // if success then alert
    toaster.success("add new " + field + " success");
  };

  const confirm = () => {
    // cut id params
    const idParam = window.location.href.split("/")[4].toString();
    // addDataa to firebase
    checkIdParam(idParam);
    setValueList([]);
    setValueList2([]);
    setValueList3([]);
    setIsShown(false);
    setIsShown2(false);
  }
  
  switch (field) {
    case "Skill":
      return (
        // if field different from skill then reset valueList
        <div className="render">
          <h1>Skill</h1>
          <div className="form">
            <div className="tag">
              {skillList.map((skill, index) => {
                return (
                  <Pane
                    display="inline-flex"
                    alignItems="center"
                    key={index}
                  >
                    <button className="list-tag-value" key={index} onClick={addValue} value={skill.name} style={{marginRight: "10px"}}>
                      {skill.name}
                    </button>
                    <span/>
                  </Pane>
                );
              })}
            </div>
            <div className="input-tag">
              <input type="text" name="skills" id="skills" placeholder="Enter your skills" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
              <button className="add-btn" onClick={addInput}>Add</button>
              {/* if valueList and valueList2 > 0 is submit button is showed */}
              {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
              <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                {valueList3.map((value, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li>{value}</li>
                      </ul>
                    </div>
                  );
                }
                )}
              </Dialog>

            </div>
          </div>
          <div className="tag-list">
            {valueList.map((value) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={value}
                >
                  <Badge color="green" marginRight={8} className="badge-value">
                    {value}
                    <button className="remove-tag" onClick={removeValue} value={value} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            {valueList2.map((value, index) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={index}
                >
                  <Badge color="green" marginRight={8} >
                    {value}
                    <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                  </Badge>

                </Pane>

              );
            })}
                  
          </div>
        </div>



      );
    case "Experinece":
      return (
        <div>
          <h1>Experinece</h1>
          <div className="form">
            <div className="tag">
              {ExperineceList.map((Experinece, index) => {
                return (
                  <Pane
                    display="inline-flex"
                    alignItems="center"
                    key={Experinece.name}
                  >
                    <button className="list-tag-value" key={index} onClick={addValue} value={Experinece.name} style={{marginRight: "10px"}}>
                      {Experinece.name}
                    </button>
                  </Pane>
                );
              })}
            </div>
            <div className="input-tag">
              <input type="text" name="Experinece" id="Experinece" placeholder="Enter your Experinece" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
              <button className="add-btn" onClick={addInput}>Add</button>
              {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
              <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                {valueList3.map((value, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li>{value}</li>
                      </ul>
                    </div>
                  );
                }
                )}
              </Dialog>
            </div>
          </div>
          <div className="tag-list">
            {valueList.map((value) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={value}
                >
                  <Badge color="green" marginRight={8} className="badge-value">
                    {value}
                    <button className="remove-tag" onClick={removeValue} value={value} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            {valueList2.map((value, index) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={index}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            </div>

        </div>
      );
    case "Certificate":
      return (
        <div>
          <h1>Certificate</h1>
          <div className="form">
            <div className="tag">
              {CertificateList.map((Certificate, index) => {
                return (
                  <Pane
                    display="inline-flex"
                    alignItems="center"
                    key={Certificate.name}
                  >
                    <button className="list-tag-value" key={index} onClick={addValue} value={Certificate.name} style={{marginRight: "10px"}}>
                      {Certificate.name}
                    </button>
                  </Pane>
                );
              })}
            </div>
            <div className="input-tag">
              <input type="text" name="Certificate" id="Certificate" placeholder="Enter your Certificate" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
              <button className="add-btn" onClick={addInput}>Add</button>
              {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
              <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                {valueList3.map((value, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li>{value}</li>
                      </ul>
                    </div>
                  );
                }
                )}
              </Dialog>
          </div>
          <div className="tag-list">
            {valueList.map((value) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={value}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={removeValue} value={value} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            {valueList2.map((value, index) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={index}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            </div>
          </div>
        </div>
      );
    case "Achievement":
      return (
        <div>
          <h1>Achievement</h1>
          <div className="form">
            <div className="tag">
              {AchievementList.map((Achievement, index) => {
                return (
                  <Pane
                    display="inline-flex"
                    alignItems="center"
                    key={Achievement.name}
                  >
                    <button className="list-tag-value" key={index} onClick={addValue} value={Achievement.name} style={{marginRight: "10px"}}>
                      {Achievement.name}
                    </button>

                  </Pane>
                );
              })}
            </div>
            <div className="input-tag">
              <input type="text" name="Achievement" id="Achievement" placeholder="Enter your Achievement" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
              <button className="add-btn" onClick={addInput}>Add</button>
              {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
              <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                {valueList3.map((value, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li>{value}</li>
                      </ul>
                    </div>
                  );
                }
                )}
              </Dialog>
          </div>
          <div className="tag-list">
            {valueList.map((value) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={value}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={removeValue} value={value} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            {valueList2.map((value, index) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={index}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            </div>
          </div>
        </div>
      );
    case "Activity":
      return (
        <div>
          <h1>Activity</h1>
          <div className="form">
            <div className="tag">
              {ActivityList.map((Activity, index) => {
                return (
                  <Pane
                    display="inline-flex"
                    alignItems="center"
                    key={Activity.name}
                  >
                    <button className="list-tag-value" key={index} onClick={addValue} value={Activity.name} style={{marginRight: "10px"}}>
                      {Activity.name}
                    </button>
                  </Pane>
                );
              })}
            </div>
            <div className="input-tag">
              <input type="text" name="Activity" id="Activity" placeholder="Enter your Activity" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
              <button className="add-btn" onClick={addInput}>Add</button>
              {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
              <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                {valueList3.map((value, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li>{value}</li>
                      </ul>
                    </div>
                  );
                }
                )}
              </Dialog>

          </div>
          <div className="tag-list">
            {valueList.map((value) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={value}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={removeValue} value={value} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            {valueList2.map((value, index) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={index}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            </div>
          </div>
        </div>
      );
    case "Education":
      return (
        <div>
          <h1>Education</h1>
          <div className="form">
            <div className="tag">
              {EducationList.map((Education, index) => {
                return (
                  <Pane
                    display="inline-flex"
                    alignItems="center"
                    key={Education.name}
                  >
                    <button className="list-tag-value" key={index} onClick={addValue} value={Education.name} style={{marginRight: "10px"}}>
                      {Education.name}
                    </button>
                  </Pane>
                );
              })}
            </div>
            <div className="input-tag">
              <input type="text" name="Education" id="Education" placeholder="Enter your Education" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
              <button className="add-btn" onClick={addInput}>Add</button>
              {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
              <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                {valueList3.map((value, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li>{value}</li>
                      </ul>
                    </div>
                  );
                }
                )}
              </Dialog>

          </div>
          <div className="tag-list">
            {valueList.map((value) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={value}
                >
                  <Badge color="green" marginRight={8} className="badge-value" >
                    {value}
                    <button className="remove-tag" onClick={removeValue} value={value} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            {valueList2.map((value, index) => {
              return (
                <Pane
                  display="inline-flex"
                  alignItems="center"
                  key={index}
                >
                  <Badge color="green" marginRight={8} className="badge-value">
                    {value}
                    <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                  </Badge>
                </Pane>
              );
            })}
            </div>
          </div>
        </div>
      );
    case "Other information":
      return (
        <div>
          <h1>Other information</h1>
          <div className="form">
            <div className="tag">
              <div className="input-tag">
                <input type="text" name="Other information" id="Other information" placeholder="Enter your Other information" className="input" value={valueTam} onChange={(e) => setValueTam(e.target.value)}/>
                <button className="add-btn" onClick={addInput}>Add</button>
                {isShown2 ? <button className="submit-btn" onClick={submit}>Submit</button> : null}
                <Dialog isShown={isShown} title={"Your " + field} onCloseComplete={() => setIsShown(false)} onConfirm={confirm}>
                  {valueList3.map((value, index) => {
                    return (
                      <div key={index}>
                        <ul>
                          <li>{value}</li>
                        </ul>
                      </div>
                    );
                  }
                  )}
                </Dialog>

              </div>
              <div className="tag-list">
                {valueList2.map((value, index) => {
                  return (
                    <Pane
                      display="inline-flex"
                      alignItems="center"
                      key={index}
                    >
                      <Badge color="green" marginRight={8} className="badge-value" >
                        {value}
                        <button className="remove-tag" onClick={() => removeInput(index)} style={{marginLeft: "3px"}}>x</button>
                      </Badge>
                    </Pane>
                  );
                })}

              </div>
              </div>
              </div>
        </div>
      );
    default:
      return (
        <div>
          <h1>add your content</h1>
        </div>
      );
  }
}

export default renderField;
