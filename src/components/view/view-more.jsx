import React from "react";
import "./view-more.css";
import Navbar from "../navbar/navbar";
// import firestore and query
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import {
  InfoSignIcon,
  SideSheet,
  Tooltip,
  Avatar,
  WarningSignIcon,
} from "evergreen-ui";
// import react qr code
import QRCode from "react-qr-code";
function ViewMore() {
  // cut id param from url
  const url = window.location.href;

  // check id in cvIds of profile in firebase
  // if id is in cvIds, get this profile

  const [userData, setUserData] = React.useState(null);

  const checkIdParam = async () => {
    const db = getFirestore();
    const q = query(collection(db, "profiles"));
    const id = url.substring(url.lastIndexOf("/") + 1);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.cvIds.includes(id)) {
        setUserData(data);
      }
    });
    console.log(userData);
  };

  const [dataList, setDataList] = React.useState(null);
  const [dateList, setDateList] = React.useState([]);
  const handleview = async () => {
    const id = url.substring(url.lastIndexOf("/") + 1);
    // get all document in cells collection
    const db = getFirestore();
    const querySnapshot = await getDocs(
      collection(db, "cells", id, "elements")
    );
    const data = [];
    const date = [];
    querySnapshot.forEach(async (doc) => {
      data.push(doc.data());
      date.push(doc.data().createdAt);
    });
    setDataList(data);
    date.reverse();
    setDateList(date);
    console.log("dữ liệu nè" + dateList);
    console.log(dataList);
    setSelectedTab(date[0]);


    const skill = [];
    const achievement = [];
    const experience = [];
    const education = [];
    const certification = [];
    const activity = [];
    const other = [];
    data.forEach((item) => {
      const createdAt = Date.now(item.createdAt);
      console.log(item.createdAt);
      if (createdAt <= Date.now(date[0])) {
        // console.log(item.data);
        if (item.type === "Skill") {
          // đẩy dữ liệu vào mảng skill theo 1 chiều
          item.data.forEach((item) => {
            skill.push(item);
          });
        }
        if (item.type === "Achievement") {
          // đẩy dữ liệu vào mảng achievement theo 1 chiều
          item.data.forEach((item) => {
            achievement.push(item);
          });
        }
        if (item.type === "Experience") {
          // đẩy dữ liệu vào mảng experience theo 1 chiều
          item.data.forEach((item) => {
            experience.push(item);
          });
        }
        if (item.type === "Education") {
          // đẩy dữ liệu vào mảng education theo 1 chiều
          item.data.forEach((item) => {
            education.push(item);
          });
        }
        if (item.type === "Certificate") {
          // đẩy dữ liệu vào mảng certification theo 1 chiều
          item.data.forEach((item) => {
            certification.push(item);
          });
        }
        if (item.type === "Activity") {
          // đẩy dữ liệu vào mảng certification theo 1 chiều
          item.data.forEach((item) => {
            activity.push(item);
          });
        }
        if (item.type === "Other_information") {
          // đẩy dữ liệu vào mảng other theo 1 chiều
          item.data.forEach((item) => {
            other.push(item);
          });
        }
      }
    });
    setSkillList(skill);
    setAchievementList(achievement);
    setExperienceList(experience);
    setEducationList(education);
    setCertificationList(certification);
    setActivityList(activity);
    setOtherList(other);


    
  };


  // run checkIdParam and handleview when page is loaded
  React.useEffect(() => {
    checkIdParam();
    handleview();
  }, []);

  // create dateTab from dateList
  const [selectedTab, setSelectedTab] = React.useState(dateList[0]);
  const [clickState, setClickState] = React.useState(false);
  const handleTab = (tab) => {
    setClickState(true);
    setSelectedTab(tab);
  };

  const [skillList, setSkillList] = React.useState(null);
  const [achievementList, setAchievementList] = React.useState(null);
  const [experienceList, setExperienceList] = React.useState(null);
  const [educationList, setEducationList] = React.useState(null);
  const [certificationList, setCertificationList] = React.useState(null);
  const [otherList, setOtherList] = React.useState(null);
  const [activityList, setActivityList] = React.useState(null);

  // from data of selectedTab, create skillList, achievementList, experienceList, educationList, certificationList, otherList with type and date before date selectedTab
  const handleList = (date) => {
    console.log("lặp lại handle List");
    const skill = [];
    const achievement = [];
    const experience = [];
    const education = [];
    const certification = [];
    const activity = [];
    const other = [];
    const dateSelected = date.split(",").reverse().join(",");
    dataList.forEach((item) => {
      // đảo ngược createdAt thành yyyy-mm-dd hh:mm:ss để so sánh
      const createdAt = item.createdAt.split(",").reverse().join(",");
      console.log(createdAt);



      if (createdAt <= dateSelected) {
        // console.log(item.data);
        if (item.type === "Skill") {
          // đẩy dữ liệu vào mảng skill theo 1 chiều
          item.data.forEach((item) => {
            skill.push(item);
          });
        }
        if (item.type === "Achievement") {
          // đẩy dữ liệu vào mảng achievement theo 1 chiều
          item.data.forEach((item) => {
            achievement.push(item);
          });
        }
        if (item.type === "Experience") {
          // đẩy dữ liệu vào mảng experience theo 1 chiều
          item.data.forEach((item) => {
            experience.push(item);
          });
        }
        if (item.type === "Education") {
          // đẩy dữ liệu vào mảng education theo 1 chiều
          item.data.forEach((item) => {
            education.push(item);
          });
        }
        if (item.type === "Certificate") {
          // đẩy dữ liệu vào mảng certification theo 1 chiều
          item.data.forEach((item) => {
            certification.push(item);
          });
        }
        if (item.type === "Activity") {
          // đẩy dữ liệu vào mảng certification theo 1 chiều
          item.data.forEach((item) => {
            activity.push(item);
          });
        }
        if (item.type === "Other_information") {
          // đẩy dữ liệu vào mảng other theo 1 chiều
          item.data.forEach((item) => {
            other.push(item);
          });
        }
      }
    });
    setSkillList(skill);
    setAchievementList(achievement);
    setExperienceList(experience);
    setEducationList(education);
    setCertificationList(certification);
    setActivityList(activity);
    setOtherList(other);

    console.log(certificationList);
  };

  const [isShowView, setIsShowView] = React.useState(false);
  const handleShowView = () => {
    setIsShowView(true);
  };


  return (
    <div className="view-more">
      <Navbar />

      <div className="view-more-content">
        <div className="view-more-content-left">
          {userData ? (
            <div className="user-data-view">
              <Avatar
                src={userData.imageUrl}
                name={userData.name}
                size={190}
                alt="user"
                className="user-image-view"
              />
              <h2>{userData.name}</h2>
              <br />
              <div className="user-info-view">
                <h3>Bio</h3>
                <p>{userData.bio}</p>
                <h3>Email contact</h3>
                <p className="user-email-data">{userData.email}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="view-more-content-right">
          <div className="right-view-content-grid">
            <div className="view-more-content-right-content-left">
              {/* if skillList is not null, render skillList */}
              {clickState ? (
                <div className="click-state">
                  {skillList && skillList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Skills</h2>
                      <div className="view-more-content-right-content-list">
                        {skillList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if achievementList is not null, render achievementList */}
                  {achievementList && achievementList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Achievements</h2>
                      <div className="view-more-content-right-content-list">
                        {achievementList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if experienceList is not null, render experienceList */}
                  {experienceList && experienceList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Experiences</h2>
                      <div className="view-more-content-right-content-list">
                        {experienceList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if educationList is not null, render educationList */}
                  {educationList && educationList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Educations</h2>
                      <div className="view-more-content-right-content-list">
                        {educationList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if certificationList is not null, render certificationList */}
                  {certificationList && certificationList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Certifications</h2>
                      <div className="view-more-content-right-content-list">
                        {certificationList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if activityList is not null, render activityList */}
                  {activityList && activityList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Activities</h2>
                      <div className="view-more-content-right-content-list">
                        {activityList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if OtherList is not null, render OtherList */}
                  {otherList && otherList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Other information</h2>
                      <div className="view-more-content-right-content-list">
                        {otherList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="view-more-content-right-content-left" style={{width: '100%'}}>
                  {/* <InfoSignIcon size={70} color="info" />
                  <p className="no-click">t
                    Choose the data time in the right to view
                  </p> */}
                  {
                    dateList && dateList.length > 0 ? (
                      <div className="click-state">
                  {skillList && skillList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Skills</h2>
                      <div className="view-more-content-right-content-list">
                        {skillList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if achievementList is not null, render achievementList */}
                  {achievementList && achievementList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Achievements</h2>
                      <div className="view-more-content-right-content-list">
                        {achievementList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if experienceList is not null, render experienceList */}
                  {experienceList && experienceList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Experiences</h2>
                      <div className="view-more-content-right-content-list">
                        {experienceList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if educationList is not null, render educationList */}
                  {educationList && educationList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Educations</h2>
                      <div className="view-more-content-right-content-list">
                        {educationList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if certificationList is not null, render certificationList */}
                  {certificationList && certificationList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Certifications</h2>
                      <div className="view-more-content-right-content-list">
                        {certificationList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if activityList is not null, render activityList */}
                  {activityList && activityList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Activities</h2>
                      <div className="view-more-content-right-content-list">
                        {activityList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {/* if OtherList is not null, render OtherList */}
                  {otherList && otherList.length > 0 ? (
                    <div className="view-more-content-right-content">
                      <h2>Other information</h2>
                      <div className="view-more-content-right-content-list">
                        {otherList.map((item, index) => {
                          return (
                            <div
                              className="view-more-content-right-content-list-item"
                              key={index}
                            >
                              <ul>
                                <li>{item}</li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="view-more-content-right-content-right-no-data">
                  <InfoSignIcon size={70} color="info" />
                  <p className="no-click">
                    No data available for this date
                  </p>
                </div>
              )}
                </div>
              )}
            </div>
            <div className="view-more-content-right-content-right">
              {dateList && dateList.length > 0 ? (
                <div className="view-more-content-right-content-right-list">
                  {dateList.map((date, index) => (
                    <div
                      className="date-tab"
                      key={index}
                      onClick={() => handleTab(date)}
                    >
                      {selectedTab === date ? (
                        <div
                          className="date-tab-selected"
                          style={{
                            color: "#0066CC",
                            borderLeft: "7px solid #0066CC",
                          }}
                        >
                          <h3 onClick={() => handleList(date)} className='date-data'>{date}</h3>
                        </div>
                      ) : (
                        <div className="date-tab-not-selected">
                          <h3 onClick={() => handleList(date)} className='date-data'>{date}</h3>
                        </div>
                      )}
                    </div>
                  ))}
                  <div
                    className="date-tab-view-details"
                    onClick={() => handleShowView()}
                  >
                    View with details transaction
                  </div>
                </div>
              ) : (
                <div className="view-more-content-right-content-right-no-data">
                  <WarningSignIcon size={70} color="danger" />
                  <p className="no-click">No data</p>
                </div>
              )}
              <React.Fragment>
                <SideSheet
                  isShown={isShowView}
                  onCloseComplete={() => setIsShowView(false)}
                >
                  <div className="timeline">
                    {/* show dataList */}
                    <ul>
                      {dataList &&
                        dataList.map((data, index) => (
                          <li key={index}>
                            <span>{data.createdAt}</span>
                            <div className="content">
                              <h3>{data.type}</h3>
                              <div className="list-data-type">
                                {data.data.map((item, index) => (
                                  <p key={index} className="item-list">
                                    {item}
                                  </p>
                                ))}
                              </div>
                              <Tooltip content="Click to check at ETHScan">
                                <h4>
                                  transaction hash:
                                  <br />
                                  <a
                                    href={`https://goerli.etherscan.io/tx/${data.transaction}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="trans-hash-link"
                                  >
                                    {/* if string more than 20, change to ... */}
                                    {data.transaction.length > 60
                                      ? data.transaction.substring(0, 60) +
                                        "..."
                                      : data.transaction}
                                  </a>
                                  <br />
                                  <br />
                                  <div style={{width: '170px', height: '170px', textAlign: 'center', backgroundColor: 'white', borderRadius: '10px'}}>
                                      <div style={{paddingTop: '10px'}}>
                                        <QRCode value={`https://goerli.etherscan.io/tx/${data.transaction}`} size={150} />
                                      </div>
                                  </div>
                                </h4>
                              </Tooltip>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </SideSheet>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMore;
