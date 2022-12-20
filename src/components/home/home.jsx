import React from 'react';
import Navbar from '../navbar/navbar';
import './home.css';
import { Button, ArrowRightIcon } from 'evergreen-ui';  
function Home() {
  return (
    <div style={{width: '100%'}} className="home-container">
        <Navbar />
        <div style={{ textAlign: 'left', marginLeft: '100px', marginRight: '40px', marginBottom: '50px'}}>
            <h1>
                <strong>Introduce Curriculum Vitae&nbsp;</strong>
            </h1>
            <p>
                <i>A document that showcases the academic and professional accomplishment of a job applicant</i>
            </p>
            <h2>
                <strong>What is a Curriculum Vitae?</strong>
            </h2>
            <p>A curriculum vitae, often abbreviated as CV, is a document that job applicants use to showcase their academic and&nbsp;personal&nbsp;accomplishments. It is used to apply for positions within areas where a person’s specific knowledge or expertise is required. A curriculum vitae is usually longer than a resume and must include the information that the recruiter needs to verify the skills, experience, and educational qualifications of an applicant.<br/>&nbsp;
            </p>
            <div style={{textAlign: 'center'}}>
                <img src="./h1.jpg" alt="h1" style={{width: '50%', height: '350px', textAlign: 'center'}} />
            </div>
            <p>
                In many countries, a CV is usually the first document that a prospective employer looks at when screening candidates for&nbsp;job interviews scholarship programs, grant applications, or bursaries. When sending a curriculum vitae and other application documents to the employer, some applicants may choose to send physical copies of the document through registered mail, or electronically through email, depending on what the prospective employer indicated on the job advertisement.
            </p>
            <h3>
                <strong>What to Include in Your CV</strong>
            </h3>
            <p>1. Personal information</p>
            <p>2. Education</p>
            <p>3. Work experience</p>
            <p>4. Honors and awards</p>
            <p>5. Skills</p>
            <p><br/><strong>The role and importance of CV creation applications</strong></p>
            <p>Using a CV design software can give you a concise, logical CV, highlighting the strengths, abilities, and qualifications of the job applicant, perhaps that is one of the contents. interested by a lot of people. It can also create the attraction of candidates before the difficult employer they will choose.</p>
            <p>CV maker software creates an impressive resume and gives a smooth start to all those who write and create and apply for a complete CV as they apply for jobs, create success and find Find a job that suits you best.</p>
            <div style={{textAlign: 'center'}}>
                <img src="./h2.jpg" alt="h2" style={{width: '30%', height: '350px', textAlign: 'center'}} />
            </div>
            <p>All difficulties or problems that you encounter can be solved using the software Can V. If you know how to use Can V software to create a CV, you will be one of the first candidates selected by employers.</p>
            <h1><strong>What is Can V?</strong>
            </h1>
            <p>Can V is a decentralized application also known as&nbsp; (DApp) based on the Ethereum platform and smart contracts&nbsp; (Smart Contracts) created by Blockchain technology.</p>
            {/* src is in public h2.jpg */}
            <div style={{textAlign: 'center'}}>
                {/* import image from public */}
                <img src="./h3.jpg" alt="h3" style={{width: '50%', height: '350px', textAlign: 'center'}} />
            </div>
            <p><i>Currently CV provides the following features:</i></p>
            <ul>
                <li>Allows users to create their own resume</li>
                <li>Update, share CV via Transaction hash or QR Code</li>
                <li>Search a variety of CVs by Content</li>
            </ul>
            <h2><strong>Simple Can V User Manual</strong></h2>
            <h3><i><strong>Register and Login Can V</strong></i></h3>
            <p>First, to use Can V's features, you need to register to create your own account. To register for an account, you need to fill in the necessary information, especially you need to have a MetaMask cryptocurrency wallet available. After successful account registration, please log in and proceed to use the features of the Can V . application</p>
            <h3><strong>CV creation feature</strong></h3>
            <p>To use this feature, click on the Create your new CV button -&gt; Enter the title of your CV . The interface will automatically go to the CV creation page for you, now you will choose the necessary information suitable for your resume such as skills, experience, education, …</p>
            <p>After you have finished, you proceed to press the save button, the system will successfully create a CV for you.</p>
            <p>Those are the special features we have briefly introduced. Now what are you waiting for, hurry up and register yourself a great CV. Wish you have a pleasant experience.</p>
            <Button appearance="primary" intent="success" iconBefore={ArrowRightIcon} style={{marginTop: '20px', marginBottom: '20px'}} height={40}>
                <h3>Start create your new CV</h3>
            </Button>
        </div>
    </div>
  );
}

export default Home;