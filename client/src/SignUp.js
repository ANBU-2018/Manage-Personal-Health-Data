import React, { useRef, useState } from 'react'
import storage from './firebaseConfig'
import Nav from './Nav'
import "./SignUp.scss"
import { languages } from './LanguageDataset'

function SignUp() {
    //Patient parameters
    const city = useRef(null)
    const district = useRef(null)
    const state = useRef(null)
    const country = useRef(null)
    const mobileNo = useRef(null)
    const houseNo = useRef(null)
    const streetName = useRef(null)
    const dob = useRef(null);
    const email = useRef(null)
    const emergencyContactName = useRef(null)
    const emergencyContactNo = useRef(null)
    const emergencyContactRltn = useRef(null)
    const gender = useRef(null)
    const occupation = useRef(null)
    const language = useRef(null)
    const maritalStatusCode = useRef(null)
    const birthOrder = useRef(null)
    const firstName = useRef(null)
    const middleName = useRef(null)
    const lastName = useRef(null)
    const prefix = useRef(null)
    const suffix = useRef(null)
    const postalCode = useRef(null)
    //view File is to check photo upload and send photo to firebase
    const [customPrefix, setCustomPrefix] = useState(false)
    const [customSuffix, setCustomSuffix] = useState(false)
    const [maritalStatus, setMaritalStatus] = useState('')
    const [multipleBirthBoolean, setMultipleBirthBoolean] = useState(false)
    const [photo, setPhoto] = useState('')
    const [viewFile, setViewFile] = useState('')

    //Functions
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            if (e.target.files[0].type.match(/image-*/)) {
                setPhoto(e.target.files[0]);
                setViewFile(URL.createObjectURL(e.target.files[0]))
            }
            else {
                alert('Not an image file')
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`images/${photo.name}`).put(photo);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(photo.name)
                    .getDownloadURL()
                    .then(async (url) => {
                        const system = language.current.value.split('-')
                        const response = await fetch('http://localhost:7000/signup/patient', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                city: city.current.value,
                                district: district.current.value,
                                state: state.current.value,
                                country: country.current.value,
                                mobileNo: mobileNo.current.value,
                                houseNo: houseNo.current.value,
                                streetName: streetName.current.value,
                                dob: dob.current.value,
                                email: email.current.value,
                                emergencyContactName: emergencyContactName.current.value,
                                emergencyContactNo: emergencyContactNo.current.value,
                                emergencyContactRltn: emergencyContactRltn.current.value,
                                gender: gender.current.value,
                                occupation: occupation.current.value,
                                language: system[0],
                                languageCode: system[1],
                                maritialStatus: maritalStatus,
                                maritialStatusCode: maritalStatusCode.current.value,
                                multipleBirthBoolean: multipleBirthBoolean,
                                birthOrder: multipleBirthBoolean ? birthOrder.current.value : 1,
                                firstName: firstName.current.value,
                                middleName: middleName.current.value,
                                lastName: lastName.current.value,
                                prefix: prefix.current.value,
                                suffix: suffix.current.value,
                                postalCode: postalCode.current.value,
                                photo: url
                            })
                        })
                        setViewFile('')
                        console.log(response)
                    })

            }
        )

    }
    const languageMap = Object.keys(languages).map(el => <option key={el} value={`${languages[el].name}-${languages[el].code}`} > {languages[el].name}</ option>)
    return (
        <div className="signUp">
            <Nav />
            <form id="SignUpForm" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className="signUp__customSelect" style={{ display: `${customPrefix ? 'none' : 'flex'}` }}>
                    <select ref={prefix} defaultChecked="Prefix" id="prefix" >
                        <option value="Prefix" hidden > Please Select your Prefix</option>
                        <option value="Mr."> Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Er.">Er.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="custom" onClick={() => setCustomPrefix(true)}>Custom</option>
                    </select>
                </div>
                {
                    customPrefix ?
                        <input ref={prefix} type="text" id="prefix" placeholder="Prefix" required /> : ''
                }
                <input ref={firstName} type="text" id="name" placeholder="First Name" required />
                <input ref={middleName} type="text" id="name" placeholder="Middle Name" />
                <input ref={lastName} type="text" id="name" placeholder="Last Name" required />
                <div className="signUp__customSelect" style={{ display: `${customSuffix ? 'none' : 'flex'}` }}>
                    <select ref={suffix} defaultChecked="Suffix" id="suffix" required>
                        <option value="Suffix" hidden > Please Select your Suffix</option>
                        <option value="Phd."> Phd.</option>
                        <option value="MD">MD</option>
                        <option value="MS">MS</option>
                        <option value="custom" onClick={() => setCustomSuffix(true)}>Custom</option>
                    </select>
                </div>
                {
                    customSuffix ?
                        <input ref={suffix} type="text" id="suffix" placeholder="Suffix" required /> : ''
                }
                <input ref={streetName} type="text" id="address" placeholder="Street" required />
                <input ref={houseNo} type="text" id="address" placeholder="House/Appartment Number" required />
                <input ref={city} type="text" id="address" placeholder="City" required />
                <input ref={district} type="text" id="address" placeholder="District" required />
                <input ref={state} type="text" id="address" placeholder="State" required />
                <input ref={country} type="text" id="address" placeholder="Country" required />
                <input ref={email} type="email" id="email" placeholder="Email" required />
                <div className="signUp__customSelect">
                    <select ref={language} defaultChecked="Language" id="language" required>
                        <option value="Language" hidden > Please Select preferred Language</option>
                        {languageMap}
                    </select>
                </div>
                <div className="signUp__radio">
                    <h5>Multiple Birth?</h5>
                    <label htmlFor="yes">
                        <input type="radio" id="yes" value={true} name="Marital Status" onClick={() => { setMultipleBirthBoolean(true) }} required />
                        Yes
                    </label>
                    <label htmlFor="no">
                        <input type="radio" id="no" value={false} name="Marital Status" onClick={() => { setMultipleBirthBoolean(false) }} required />
                        No
                    </label>
                </div>
                {
                    multipleBirthBoolean ?
                        <div>
                            Enter Your Birth Order:
                            <input ref={birthOrder} type='text' placeholder="Birth Order" />
                        </div> : ''
                }
                <div className="signUp__radio">
                    <h5>Marital Status:</h5>
                    <div className="signUp__customSelect">
                        <select ref={maritalStatusCode} defaultChecked="Marital Status" id="Marital Status" required>
                            <option value="Marital Status" hidden > Please Select you status</option>
                            <option value="A" onClick={() => setMaritalStatus('Annuled')} >Annuled</option>
                            <option value="D" onClick={() => setMaritalStatus('Divorced')} >Divorced</option>
                            <option value="I" onClick={() => setMaritalStatus('Interlocutory')} >Interlocutory</option>
                            <option value="L" onClick={() => setMaritalStatus('Legally Separated')} >Legally Seperated</option>
                            <option value="M" onClick={() => setMaritalStatus('Married')} >Married</option>
                            <option value="P" onClick={() => setMaritalStatus('Polygamous')} >Polygamous</option>
                            <option value="S" onClick={() => setMaritalStatus('Never Married')} >Never Married</option>
                            <option value="T" onClick={() => setMaritalStatus('Domestic Partner')} >Domestic Partner</option>
                            <option value="U" onClick={() => setMaritalStatus('Unmarried')} >Unmarried</option>
                            <option value="W" onClick={() => setMaritalStatus('Widowed')} >Widowed</option>
                            <option value="UNK" onClick={() => setMaritalStatus('unknown')} >unknown</option>
                        </select>
                    </div>
                </div>
                <input ref={postalCode} type="text" id="postalCode" placeholder="Postal Code" required />
                <input ref={dob} type="date" onChange={() => { console.log(dob.current.value) }} id="dob" placeholder="Date of Birth" required />
                <input ref={mobileNo} type="text" id="contactInfo" placeholder="Mobile Number" required />
                <input type="file" accept="image/*" id="image" alt="Profile photo" onChange={handleChange} required />
                <img src={viewFile} style={{ height: '81px', width: '256px' }} alt="Uploaded" />
                <input ref={occupation} id="Occupation" type="text" placeholder="Occupation" required />
                <div className="signUp__select">
                    <h4>Gender</h4>
                    <div className="signUp__customSelect">
                        <select ref={gender} defaultChecked="Select Gender" id="gender" required>
                            <option value="Select Gender" hidden > Please Select Your Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="signUp__emergency">
                    <h4>Emergency contact</h4>
                    <hr />
                    <input ref={emergencyContactName} id="emergencyContactName" type="text" placeholder="Name" required />
                    <input ref={emergencyContactNo} type="text" id="emergencyContactInfo" placeholder="Contact info" required />
                    <input ref={emergencyContactRltn} type="text" id='relation' placeholder="Relation" required />
                </div>
                <button type="submit" id='submit' form="SignUpForm">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp
