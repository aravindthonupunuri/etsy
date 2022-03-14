import * as React from 'react';
import usa from '../../images/usa.png';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import currencyAction from '../../actions/currencyAction';

export default function Footer() {

    const [currencyType, setCurrencyType] = useState("$");
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(loginAction(emailId));
        dispatch(currencyAction(currencyType))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currencyType])

  return (
    <div>
    <div style = {{
     display: 'flex',   
     color: 'white',
     backgroundColor: 'green',
     height: '50px',
     marginTop: '55px',
     padding: '10px'
     }}>
         
         <img style={{ width: '2%' }} src={usa} alt='no country' />
         <p style={{ marginLeft: '2%' }}>
         Currency
         </p>
         <p style={{ marginLeft: '2%' }}>
         <Form.Select style={{ width: '109px', marginBottom: '20px' }}
                onChange={(e) => setCurrencyType(e.target.value)}
                >
                <option>{'\u0024'}</option>
                <option value = {'\u0024'}>{'\u0024'}</option>
                <option value= {'\u20B9'}>{'\u20B9'}</option>
                <option value={'\uFFE1'}>{'\uFFE1'}</option>
                <option value={'\u00A2'}>{'\u00A2'}</option>
         </Form.Select>  
         </p>
       
    </div>
    </div>

  );
}