import React, { useState } from 'react'
import '../src/css/header.css'
function Header() {

    const[result , setResult] = useState(null)

    const sendImage = async(file)=>{
        const formData = new FormData()
        formData.append("file",file)

        const response = await fetch("https://potatoe-disease-fastapi-url.onrender.com/predict" , {
            method: "POST",
            body: formData,
        })

        const data = await response.json()
        setResult(data)
    }

    return (
        <>
            <header>
                <div class="head">
                    <ul class="it">
                        <li> 
                            <h1 style={{ color: 'white', marginTop:'50px'}}> Potato health Detector </h1>
                        </li>
                    </ul>

                </div>
                <div class = 'container1'>
                <div class="about1">
                  
                </div>
                <form class='form-class'>
                     <input type='file' onChange={(e)=> sendImage(e.target.files[0])} placeholder='submit'></input>
                </form>

                {
                    result && (<div style = {{color:"white" , marginTop: "20px"}}>
                        <div style={{marginTop: "13vh", marginLeft:"7vh" , backgroundColor:"black", padding:"10px" , borderRadius:'10px' , width:'40vh' , position:"relative"    }}>
                        <h3>Class: {result.class}</h3>
                        <h4>Confidence: {result.confidence}%</h4>
                        </div>
                        </div>
                    )
                    }

                </div>
            </header>
        </>
    )
}

export default Header
