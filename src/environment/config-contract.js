// import { ethers } from "ethers";
// import { useState } from "react";
// import abi from "./CreateCV.json";
// const contractAddress = "0x1887B713292e833C70E2ae584dfA3890C4135868";
// export default contractAddress;

// const connect = () => {
//   const [currentAccount, setCurrentAccount] = useState("");
//   const contractABI = abi.abi;
//   const contractAdress = contractAddress;
//   //connect to metamask
//   const connectWallet = async () => {
//     try {
//       const { ethereum } = window;
//       if (!ethereum) {
//         alert("Get MetaMask!");
//         return;
//       }
//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setCurrentAccount(accounts[0]);
//       console.log("Connected: ", accounts[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const connectToBlockchain = async () => {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractABI, signer);
//     return contract;
//   };

//   //   const [isOwner, setIsOwner] = useState(true);
//   //checkOwnerOrManager
//   const checkOwnerOrManager = async () => {
//     const contract = await connectToBlockchain();
//     const isOwner = await contract.checkOwnerOrManager(currentAccount);
//     // setIsOwner(isOwner);
//     return isOwner;
//   };
//   const [typeData, setTypeData] = useState("");
//   const [createAt, setCreateAt] = useState("");
//   const [messages, setMessages] = useState("");
//   const [transactionETH, setTransactionETH] = useState("");
//   //cvDetailsList
//   const cvDetailsList = async () => {
//     const contract = await connectToBlockchain();
//     const checkOwnerOrManager = checkOwnerOrManager();
//     try {
//       if (checkOwnerOrManager) {
//         const transaction = await contract.cvDetailsList(
//           typeData,
//           createAt,
//           messages,
//           currentAccount //da nhan address wallet vi da set vao 'setcurrentAccount'
//         );
//         console.log("transaction: ", transaction);
//         await transaction.wait();
//         setTransactionETH(transaction.hash); // dua transaction vao setTransactionETH nen trainsactionETH se co chuoi hash phai xai await nha tai vi ton time de get hash
//         console.log("transactionETH: ", transactionETH);
//         //thuc hien day vao firebase khuc sau

//       }
//     } catch (error) {}
//   };
//   //addManager
//     const addManager = async (address) => {
//         const contract = await connectToBlockchain();
//         const checkOwnerOrManager = checkOwnerOrManager();
//         try {
//             if (checkOwnerOrManager) {
//                 const transaction = await contract.addManager(address);
//                 console.log("transaction: ", transaction);
//                 await transaction.wait();
//                 setTransactionETH(transaction.hash); // dua transaction vao setTransactionETH nen trainsactionETH se co chuoi hash phai xai await nha tai vi ton time de get hash
//                 console.log("transactionETH: ", transactionETH);
//                 //thuc hien day vao firebase khuc sau
//             }
//         } catch (error) {}
//     };

//   //removeManager
//   const removeManager = async (id) => {
//     //alert with option to cancel or confirm
//     if (window.confirm("Are you sure you want to remove this manager?")) {
//       try {
//         const contract = await connectToBlockchain();
//         const manager = await contract.removeManager(id);
//         await manager.wait();
//         setTransactionETH(manager.hash);
//         //vd add vao firebase khuc nay 
//         // const docRef = doc(db, "managers", id);
//         // await updateDoc(docRef, {
//         //   status: "inactive",
//         //   transactionETHRemove: manager.hash,
//         // });
//         // alert("Update status successfully");
//         // window.location.reload();
//       } catch (error) {
//         console.log(error);
//         alert("You are not a ADMIN!!!");
//       }
//     }
//   };  
//   // may tu tach may ham nay qua cac page khac cho xong bai nha khai bao contractAddress nhu tren de dung chung
//   //ok => 
// };
