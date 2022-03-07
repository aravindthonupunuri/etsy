// import firebaseApp from "../../firebaseConfig"; 
// import {
//     getStorage,
//     ref,
//     uploadBytesResumable,
//     getDownloadURL
// } from "firebase/storage";

// const storage = getStorage(firebaseApp);
// const imagesRef = ref(storage, `/Profile/${userProfilePic.name}`);

// const uploadTask = uploadBytesResumable(imagesRef, userProfilePic);

// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(
//   "state_changed",
//   (snapshot) => {
//     const progress =
//       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log("Upload is " + progress + "% done");
//   },
//   (error) => {
//     console.log(error.code);
//   },
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    