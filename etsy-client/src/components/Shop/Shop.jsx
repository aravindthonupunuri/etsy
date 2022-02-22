import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';
import backendServer from '../../webconfig';
import Appbar from '../Appbar/Appbar';

export default function Shop() {
    const [nameOfShop, setShopName] = useState(""); 
    const [shopDetails, setShopDetails] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [isShop, setShop] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    let checkShop = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/shop`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        let shopDetails = await res.json();
        console.log(shopDetails.length)
        console.log(shopDetails);
        if (shopDetails.length !== 0) {
            console.log("hii using effect 200..!")
            shopDetails = shopDetails[0]; 
            console.log(shopDetails);
            setShopDetails(shopDetails);
            setShop(true);
        }
        else {
            console.log("hii using effect!")
            setShop(false);
        }
    }

    // useEffect(() => {checkShop()}, [])

    const getUserDetails = async () => {
        const token = sessionStorage.getItem('token');
        let res = await fetch(`${backendServer}/api/user/profile`, {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        console.log("came to fetch user details")
        let result = await res.json();
        result = result[0];
        setUserDetails(result);
        // return result[0];
    }

    const checkAndCreateShop = async () => {
        const obj = {
            shopname: nameOfShop,
            shopimage: "image"
        }
           const token = sessionStorage.getItem('token');
           let res = await fetch(`${backendServer}/api/upload/shop`, {
            method: 'POST',
            headers: {
              'auth-token': token,
              'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
          })
          if(res.status === 200) setShop(true);   
          else setErrorMsg(true);
    }
    
    if(!isShop)
    checkShop();

    if(isShop) {
         
        console.log("checking user details" + userDetails)
        if(userDetails.username === undefined) {
            getUserDetails(); 
            console.log("getting user detrails")
               
        }   
        let shopname = shopDetails.shopname
        let username = userDetails.username
        return <div>
            <Appbar />
            <div>
                <h1>
                  Welcome {username}
                </h1>
                <h2>
                    This is your shop name {shopname}
                </h2>
            </div>
        </div>
    }
    else {
        return <div>
            <Appbar />
        <div>
            <FormControl onChange={(e) => {setShopName(e.target.value)}}  style={{ width: "800px", marginTop: "100px", left: 0, marginLeft: "100px" }} type="search" placeholder="Enter Shop Name" className="mr-2 barsize" aria-label="Search" />

            <div className="text-danger">
                  {errorMsg ? <h5>{errorMsg}</h5> : null}
            </div>
            <button onClick={checkAndCreateShop} className="btn btn-warning btn-lg btn-block" style={{marginLeft: "400px", marginTop: "10px"}}>
                Check Availability
            </button>
            

        </div>
    </div>
    }
}