import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../../css/main.css";
import axios from "axios";
import DateFormatterService from '../../service/DateFormatterService';


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const H2 = styled.h2`
    color: var(--color-primary);
    margin-bottom: 25px;
`

const Form = styled.div`
    display: flex;
    flex-direction: row;
`

const FormTitle = styled.div`


`
const FormTitleItem = styled.div`
width: 200px;
height: 50px;
font-size: 1.2rem;
display: flex;
justify-content: flex-start;
align-items: center;

`
const FormContent = styled.div`

`
const FormContentItem = styled.div`
font-size: 1.2rem;
height: auto;

display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
`

const FormContentItemCheckbox = styled.div`
display: flex;
width: 220px;
height: 40px;
margin: 5px 20px;
padding: 0px 10px;
justify-content: center;
align-items: center;
flex-direction: row;
font-size: 1.2rem;
`



const Button = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`

const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 0 22px 22px 0;
    &::after {
        content: "";
        border: 2px solid black;
        position: absolute;
        top: 5px;
        left: 5px;
        right: 20px;
        background-color: transperent;
        width: 95%;
        height: 95%;
        z-index: -1;
    }
`

const ButtonClick = styled.button`
    padding: 10px;
    border: 2px solid black;
    background-color: black;
    color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: var(--color-primary);
    }
    &:active {
        background-color: var(--color-primary);
        transform: translate(5px, 5px);
        transition: transform 0.25s;
    }
`


const InputText = styled.input`
    width: 220px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }

`
const InputDate = styled.input`
    width: 220px;
    height: 40px;
    margin: 5px 20px;
    border: 1px solid #333;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`
const InputRadio = styled.input`

padding: 0px 10px;
`

const InputRadioSpan = styled.span`
padding: 0px 10px;
`

const Select = styled.select`
width: 220px;
    height: 40px;
    margin: 5px 20px;
    border: 1px solid #333;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    } 
`

const Option = styled.option``

const Label = styled.label`
display: flex;
height: 100%;
justify-content: center;
align-items: center;
`

const Error = styled.span`
    font-size: 1.1rem;
    color: red;
`

const EditUserMain = (props) => {
    const navigate = useNavigate();
    const [staffCode, setStaffCode] = useState(props.data.staffCode);
    const [firstName, setFirstName] = useState(props.data.firstName);
    const [lastName, setLastName] = useState(props.data.lastName);
    const [birthDate, setBirthDate] = useState(props.data.birthDate.split('T')[0]);
    const [joinedDate, setJoinedDate] = useState(props.data.joinedDate.split('T')[0]);
    const [locationNameAdmin, setLocationNameAdmin] = useState("");
    const [gender, setGender] = useState(props.data.gender);
    const [roleName, setRoleName] = useState(props.data.roleName);

    // Error state
    const [emptyError, setEmptyError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [joinedDateSaturdaySundayError, setJoinedDateSaturdaySundayError] = useState(false);
    const [joinedDateSoonError, setJoinedDateSoonError] = useState(false);

    // Get staffcode from adminLogin
    useEffect(() => {
        const getLocationNameAdmin = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('user_info'));
                const staffCode = userInfo.id;
                const getLocationAdmin = await axios.get(`http://localhost:8080/admin/api/location/${staffCode}`
                ,{headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}});
                setLocationNameAdmin(getLocationAdmin.data.name);
            } catch (err) {
                console.log(err);
            }
        }
        getLocationNameAdmin();
    }, [])

    const handleChangeBirthDate = (e) => {
        setBirthDateError(false);
        setBirthDate(e.target.value);
    }

    const handleChangeJoinedDate = (e) => {
        setJoinedDateSoonError(false);
        setJoinedDateSaturdaySundayError(false);
        setJoinedDate(e.target.value);
    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getDay(dateString) {
        var joinedDate = new Date(dateString);
        var date = joinedDate.getDay();
        return date;
    }

    const handleEditUser = () => {
        if (firstName === "" || lastName === "" || birthDate === "" || joinedDate === "" || locationNameAdmin === "" || gender === "" || roleName === "") {
            setEmptyError(true);
            return;
        }
        if (getAge(birthDate) < 18) {
            setBirthDateError(true);
            return;
        }
        if (getDay(joinedDate) == 6 || getDay(joinedDate) == 0) {
            setJoinedDateSaturdaySundayError(true);
            return;
        }
        if (joinedDate <= birthDate) {
            setJoinedDateSoonError(true);
            return;
        }

        const createUserRes = axios.put(`http://localhost:8080/admin/api/edit/${staffCode}`, {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            joinedDate: joinedDate,
            locationName: locationNameAdmin,
            gender: gender,
            roleName: roleName
        },{headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}})
        .then(() => {
            navigate("/manage-user");
        })
    }

    console.log("Data edits: ", staffCode, firstName, lastName, birthDate, joinedDate, locationNameAdmin, gender, roleName);

    return (
        <Container>
            <H2>Edit User</H2>
            <Form>
                <FormTitle>
                    <FormTitleItem>First Name</FormTitleItem>
                    <FormTitleItem>Last Name</FormTitleItem>
                    <FormTitleItem>Date of Birth</FormTitleItem>
                    <FormTitleItem>Gender</FormTitleItem>
                    <FormTitleItem>Joined Date</FormTitleItem>
                    <FormTitleItem>Type</FormTitleItem>
                </FormTitle>
                <FormContent>
                    <FormContentItem>
                        <InputText id='editUser_firstName' type="text" value={firstName} disabled className='borderPrimary'></InputText>
                    </FormContentItem>
                    <FormContentItem>
                        <InputText id='editUser_lastName' type="text" value={lastName} disabled className='borderPrimary'></InputText>
                    </FormContentItem>
                    <FormContentItem>
                        <InputDate type="date"
                            id='editUser_birthDate'
                            value={birthDate}
                            className={birthDateError ? "borderDanger" : "borderPrimary"}
                            onChange={(e) => { handleChangeBirthDate(e) }}
                        ></InputDate>
                        {birthDateError && <Error>User is under 18. Please select a different date</Error>}
                    </FormContentItem>
                    <FormContentItemCheckbox>
                        {
                            props.data.gender == true ?
                                <>
                                    <Label id='editUser_genderTrue1'>
                                        <InputRadio type="radio" name="genderUser" checked value={true} onChange={(e) => { setGender(e.target.value) }} />
                                        <InputRadioSpan>Male</InputRadioSpan>
                                    </Label>
                                    <Label id='editUser_genderFalse1'>
                                        <InputRadio type="radio" name="genderUser" value={false} onChange={(e) => { setGender(e.target.value) }} />
                                        <InputRadioSpan>Female</InputRadioSpan>
                                    </Label>
                                </>
                                :
                                <>
                                    <Label id='editUser_genderTrue2'>
                                        <InputRadio type="radio" name="genderUser" value={true} onChange={(e) => { setGender(e.target.value) }} />
                                        <InputRadioSpan>Male</InputRadioSpan>
                                    </Label>
                                    <Label id='editUser_genderFalse'>
                                        <InputRadio type="radio" name="genderUser" checked value={false} onChange={(e) => { setGender(e.target.value) }} />
                                        <InputRadioSpan>Female</InputRadioSpan>
                                    </Label>
                                </>
                        }
                    </FormContentItemCheckbox>
                    <FormContentItem>
                        <InputDate type="date"
                            id='editUser_joinedDate'
                            value={joinedDate}
                            onChange={(e) => { handleChangeJoinedDate(e) }}
                            className={joinedDateSaturdaySundayError || joinedDateSoonError ? "borderDanger" : "borderPrimary"}
                        ></InputDate>
                        {joinedDateSaturdaySundayError && <Error>Joined date is Saturday or Sunday. Please select a different date</Error>}
                        {joinedDateSoonError && <Error>Joined date is not later than Date of Birth. Please select a different date</Error>}
                    </FormContentItem>
                    <FormContentItem>
                        <Select name="roleName" id='editUser_roleNameSelect' onChange={(e) => { setRoleName(e.target.value) }} >
                            {props.data.roleName == "ADMIN" ?
                                <>
                                    <Option disabled>
                                        Type
                                    </Option>
                                    <Option value="ADMIN" selected>Admin</Option>
                                    <Option value="STAFF">Staff</Option>
                                </>
                                :
                                <>
                                    <Option disabled>
                                        Type
                                    </Option>
                                    <Option value="ADMIN">Admin</Option>
                                    <Option value="STAFF" selected>Staff</Option>
                                </>

                            }
                        </Select>
                    </FormContentItem>
                    {emptyError && <Error>Please fill all infomation before Save</Error>}

                    <Button>
                        <ButtonContainer>
                            <ButtonClick
                                onClick={() => { handleEditUser() }}
                                id='editUser_Save'
                            >
                                Save
                            </ButtonClick>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonClick
                                id='editUser_Cancel'
                                onClick={() => navigate("/manage-user")}
                            >Cancel</ButtonClick>
                        </ButtonContainer>
                    </Button>
                </FormContent>
            </Form>
        </Container>
    )
}

export default EditUserMain