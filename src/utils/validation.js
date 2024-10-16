import React from 'react'

export const validation = (email,password) => 
{
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  

    const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if(!emailValid)
    {
        return "Please Enter Correct Email Address";
    }

    if(!passwordValid)
    {
        return "Please Enter Valid Password";
    }

    

    return null;
 
}


