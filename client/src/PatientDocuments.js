import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import "./PatientDocument.scss"
import {SearchIcon} from '@heroicons/react/solid'
import { useHistory } from 'react-router'
import { documentGet, shareDocs } from './features/counterSlice'
import {ShareIcon} from "@heroicons/react/solid"
function PatientDocuments() {
    const [searchText,setSearchText] = useState('');
    const [category, setCategory]=useState('')
    const history=useHistory();
    const userData = useSelector(state => state.user.value);
    const [searchedData,setSearchedData]=useState([]);
    let [temporaryData, settemporaryData] = useState([]);
    const [reportDate2,setReportDate2]=useState('');
    const [reportDate1, setReportDate1] = useState('');
    const dispatch = useDispatch();
   

    const [dummy,setDummy]=useState(false);
    useEffect(()=>{
        async function searchData(){
        const response=await fetch(`http://localhost:7000/search?patientId=${userData?.uId}`,{
            method:"GET"
        });
        const data=await response.json();
        setSearchedData(data);
        console.log(data);
    }
        return searchData();
    },[]);
    return (
        <div className="patientDocument">
            <div className="patientDocument__alert">
                <h3>Files added to the sharing list</h3>
                <div>
                    <button
                    onClick={()=>{
                        history.push("/home/shareDocuments")
                    }}
                    >Share Documents</button>
                    <button
                    onClick={()=>{
                        document.querySelector(".patientDocument__alert").classList.remove('active')
                    }}
                    >Ok</button>
                </div>
            </div>
            {console.log(temporaryData)}
            <div className="patientDocument__content">
                <div className="patientDocument__documents">
                    <div className="patientDocument__searchBar">
                        <input  type="search" onChange={(e)=>{
                            console.log(e.target.value)
                            if(e.target.value != ''){
                                console.log('Hello')
                                console.log(temporaryData.length)
                                if(temporaryData.length == 0){
                                    let temp=[]
                                    Object.keys(searchedData).map((key)=>{
                                    if(searchedData[key].reportTitle.includes(e.target.value)){
                                        console.log('Hello')
                                        temp.push(searchedData[key]);
                                    }
                                    settemporaryData(temp)
                                })
                                }
                                else{
                                    let temporary=temporaryData;
                                    let temp=[]
                                    Object.keys(temporary).map((key)=>{
                                        if(temporary[key].reportTitle.includes(e.target.value)){
                                            temp.push(temporary[key]);
                                        }
                                        settemporaryData(temp)
                                    })
                                }}else{settemporaryData([])}
                        }} placeholder="Record Type" />
                        <input onChange={(e)=>{
                            console.log(e.target.value)
                            if(e.target.value != ''){
                                console.log('Hello')
                                console.log(temporaryData.length)
                                if(temporaryData.length == 0){
                                    let temp=[]
                                    Object.keys(searchedData).map((key)=>{
                                    if(searchedData[key].bodyPart.includes(e.target.value)){
                                        temp.push(searchedData[key]);
                                    }
                                    settemporaryData(temp)
                                })
                                }
                                else{
                                    let temporary=temporaryData;
                                    let temp=[]
                                    Object.keys(temporary).map((key)=>{
                                        if(temporary[key].bodyPart.includes(e.target.value)){
                                            temp.push(temporary[key]);
                                        }
                                        settemporaryData(temp)
                                    })
                                }}else{settemporaryData([])}
                        }}  type="text" placeholder="Body Site"/>
                        <input onChange={(e)=>{
                            console.log(e.target.value)
                            if(e.target.value != ''){
                                console.log('Hello')
                                console.log(temporaryData.length)
                                if(temporaryData.length == 0){
                                    let temp=[]
                                    Object.keys(searchedData).map((key)=>{
                                    if(searchedData[key].symptoms.includes(e.target.value)){
                                        temp.push(searchedData[key]);
                                    }
                                    settemporaryData(temp)
                                })
                                }
                                else{
                                    let temporary=temporaryData;
                                    let temp=[]
                                    Object.keys(temporary).map((key)=>{
                                        if(temporary[key].symptoms.includes(e.target.value)){
                                            temp.push(temporary[key]);
                                        }
                                        settemporaryData(temp)
                                    })
                                }}else{settemporaryData([])}
                        }}  type="text" placeholder="Symptoms"/>
                        <input type="date" onChange={(e)=>{
                            console.log(e.target.value)
                            if(e.target.value != '' && reportDate2 !=''){
                                console.log('Hello')
                                console.log(temporaryData.length)
                                setReportDate1(e.target.value)
                                if(temporaryData.length == 0){
                                    let temp=[]
                                    Object.keys(searchedData).map((key)=>{
                                    if((parseInt(searchedData[key].date.split('-').join(''))>= parseInt(e.target.value.split('-').join(''))) 
                                    && (parseInt(searchedData[key].date.split('-').join(''))<= parseInt(reportDate2.split('-').join('')))){
                                        temp.push(searchedData[key]);
                                    }
                                    settemporaryData(temp)
                                })
                                }
                                else{
                                    let temporary=temporaryData;
                                    let temp=[]
                                    Object.keys(temporary).map((key)=>{
                                        if((parseInt(searchedData[key].date.split('-').join(''))>= parseInt(e.target.value.split('-').join(''))) 
                                        && (parseInt(searchedData[key].date.split('-').join(''))<= parseInt(reportDate2.split('-').join('')))){
                                            temp.push(temporary[key]);
                                        }
                                        settemporaryData(temp)
                                    })
                                }}else{setReportDate1(e.target.value);settemporaryData([])}
                        }}
                         />
                         <input type="date" onChange={(e)=>{
                            console.log(e.target.value)
                            if(e.target.value != '' && reportDate1 !=''){
                                console.log('Hello')
                                console.log(temporaryData.length)
                                setReportDate2(e.target.value);
                                if(temporaryData.length == 0){
                                    let temp=[]
                                    Object.keys(searchedData).map((key)=>{
                                    if((parseInt(searchedData[key].date.split('-').join(''))<= parseInt(e.target.value.split('-').join(''))) 
                                    && (parseInt(searchedData[key].date.split('-').join(''))>= parseInt(reportDate1.split('-').join('')))){
                                        temp.push(searchedData[key]);
                                    }
                                    settemporaryData(temp)
                                })
                                }
                                else{
                                    let temporary=temporaryData;
                                    let temp=[]
                                    Object.keys(temporary).map((key)=>{
                                        if((parseInt(searchedData[key].date.split('-').join(''))<= parseInt(e.target.value.split('-').join(''))) 
                                    && (parseInt(searchedData[key].date.split('-').join(''))>= parseInt(reportDate1.split('-').join('')))){
                                            temp.push(temporary[key]);
                                        }
                                        settemporaryData(temp)
                                    })
                                }}else{setReportDate2(e.target.value);settemporaryData([])}
                        }} />
                        <select onChange={(e)=>{

                        }}>
                            <option>Health and Respirotary</option>
                            <option>Psychiatry procedure or service</option>
                            <option>Counselling</option>
                            <option>Education</option>
                            <option>Surgical procedure</option>
                            <option>Diagnostic procedure</option>
                            <option>Chiropractic manipulation</option>
                            <option>Social service procedure</option>
                        </select>
                        <SearchIcon className="searchIcon" onClick={()=>setDummy(!dummy)} />
                    </div>
                    <div className="patientDocuments__details">
                        <table>
                            <thead>
                                <tr>
                                    <td>Record Type</td>
                                    <td>Created Date</td>
                                    <td>Symptoms</td>
                                    <td>Category</td>
                                    <td>Hospital</td>
                                </tr>
                            </thead>
                            <tbody>
                            {console.log(temporaryData)}
                                {Object.keys(temporaryData).map((key)=>{
                                     return(
                                        <tr className="patientDocuments__dataList" key={key}  >
                                            <td onClick={()=>{
                                            dispatch(documentGet(temporaryData[key].filename));
                                            history.push('documentviewer'
                                            )}}>{temporaryData[key].reportTitle}</td>
                                            <td onClick={()=>{
                                            dispatch(documentGet(temporaryData[key].filename));
                                            history.push('documentviewer'
                                            )}}>{temporaryData[key].date}</td>
                                            <td onClick={()=>{
                                            dispatch(documentGet(temporaryData[key].filename));
                                            history.push('documentviewer'
                                            )}}>{temporaryData[key].symptoms}</td>
                                            <td onClick={()=>{
                                            dispatch(documentGet(temporaryData[key].filename));
                                            history.push('documentviewer'
                                            )}}>{temporaryData[key].category}</td>
                                            <td onClick={()=>{
                                            dispatch(documentGet(temporaryData[key].filename));
                                            history.push('documentviewer'
                                            )}}>{temporaryData[key].hospitalName}</td>
                                            <td className="patientDocuments__shareIcon"
                                            onClick={()=>{
                                                dispatch(shareDocs(temporaryData[key]));
                                                document.querySelector('.patientDocument__alert').classList.toggle("active");
                                            }}
                                            ><ShareIcon className="shareIcon" /> </td>
                                        </tr>
                                    
                                        )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientDocuments
