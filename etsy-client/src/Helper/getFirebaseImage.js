import firebaseApp from "../firebaseConfig"; 
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

export default function getFirebaseImage(pic, path) {

    const storage = getStorage(firebaseApp);
    const imagesRef = ref(storage, `/${path}/${pic.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, pic);
    
    // Listen for state changes, errors, and completion of the upload.
     return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
                  return resolve(downloadURL)
              })
            }
          )
     }
       
    )
}


    