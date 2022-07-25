import styled from "styled-components";
import {CloseOutlined} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import "../css/main.css";
import {useNavigate} from "react-router-dom";
import LoginService from "../service/LoginService";
import axios from "axios";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;


    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    animation: fadeIn linear 0.1s;
`

const ModalWrapper = styled.div`
    width: 500px;
    height: auto;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: var(--color-white);
    color: var(--color-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    --growth-from: 0.7;
    --growth-to: 1;
    animation: growth linear 0.1s;
        border: 1px solid #333;
`

const ModalImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: var(--color-dark);
`

const ModalContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;


    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const CloseModalButton = styled.span`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`

const Button = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`

const H1 = styled.h1`
margin-top: 30px;
`

const ModalForm = styled.form`
width: 100%;    
height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &:hover {
        box-shadow: none;
    }
`

const ModalFormItem = styled.div`
margin: 10px 30px;
display: flex;
flex-direction: column;
`
const FormSpan = styled.span`
font-size: 1.2rem;
height: 600;
color: var(--color-dark-light);
margin-bottom: 3px;
`
const FormInput = styled.input`
background-color: var(--color-white);
color: var(--color-dark);
width: auto;
padding: 12px 20px;
margin: 8px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
&:focus {
    border: 1px solid var(--color-success);
    box-shadow: var(--color-success) 0px 1px 4px, var(--color-success) 0px 0px 0px 3px;
}
`

const ButtonUpdate = styled.div`
    width: 100%;
    margin: 18px 0px;
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

const FormImg = styled.img`
    margin: auto;
    width: 50%;
    object-fit: cover;
    height: 200px;
`
const H2 = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
  color: var(--color-primary);
  border-bottom: 1px solid #333;
  width: 100%;
  height: 60px;
  margin: 0;
  border-radius: 10px;
  background-color: #eff1f5;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px 20px 10px 90px;
`

const Input = styled.input`
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

const Label = styled.label`
    font-size: 1.2rem;
    display: flex;
    width: 100%;
    justify-content: space-between;

`

const Title = styled.div`
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Error = styled.span`
    font-size: 1.1rem;
    color: red;
`

const Modal = ({showModal, setShowModal, type}) => {
    const [newPassword, setNewPassword] = useState("");
    const [isChangePasswordSuccess, setIsChangePasswordSuccess] = useState(false);
    let navigate = useNavigate();

    // First Login
    const [isFirstLoginSuccess, setIsFirstLoginSuccess] = useState(false);
    const handleClosetFirstLogin = () => {
        setIsFirstLoginSuccess(false);
        setShowModal(prev => !prev);
    }

    const [errorFirst, setErrorFirst] = useState('');
    const userinfo = JSON.parse(localStorage.getItem("user_info"));
    const changePasswordFirstLogin = (username, newPassword) => {
        LoginService.changePasswordFirstLogin(username, newPassword)
            .then((res) => {
                console.log(res);
                const userinfo = JSON.parse(localStorage.getItem("user_info"));
                localStorage.removeItem("user_info");
                userinfo.state = "ACTIVE";
                localStorage.setItem("user_info", JSON.stringify(userinfo));
                // setIsChangePasswordSuccess(true)
                setIsFirstLoginSuccess(true);
                // setShowModal((prev) => !prev);
            })
            .catch((errors) => {
                console.log(errors.response);
                if (errors) {
                    setErrorFirst(errors.response.data.message);
                }
            });
    };

    const handleFirstLogin = (username, newPassword) => {
        changePasswordFirstLogin(username, newPassword);
    };

    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
            // setLinkHinhAnh(null);
        }
    }

    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                // setLinkHinhAnh(null);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );


    // =============== Xử lý xóa danh mục ===============

    const handleLogout = () => {
        localStorage.removeItem("user_info");
        navigate("../login", {replace: true});
    }

    // =============== Change password ===============
    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const [message, setMessage] = useState('');
    const [staffCode, setStaffCode] = useState('');
    const [password, setPassword] = useState();
    const [newPass, setNewPass] = useState();

    const handleChangePassword = (e) => {
        const url = 'http://localhost:8080/user/api/change-password';
        axios
            .post(url, {staffCode: staffCode, password: password, newPassword: newPass}, {
                headers: {
                    'Authorization': `Bearer ${userInfo.accessToken}`
                }
            })
            .then((response) => {
                setIsChangePasswordSuccess((prev) => !prev);
            })
            .catch((error) => {
                setMessage(error.response.data.message);
            });
    };

    const handleCloseSuccess = () => {
        setIsChangePasswordSuccess(false);
        setShowModal(prev => !prev);
        localStorage.removeItem("user_info");
        navigate("../login", {replace: true});
    }

    useEffect(() => {
        if (userInfo != null) {
            setStaffCode(JSON.parse(localStorage.getItem('user_info')).id);
        }
    }, [localStorage.getItem('user_info')])

    const isChangePasswordNotEmpty = () => {
        if (password !== null && newPass !== null) {
            return true;
        }
        return false;
    };

    if (type === 'changePassword') {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} >
                        <ModalWrapper showModal={showModal} id="changepassword">
                            <H2>Change password</H2>
                            {isChangePasswordSuccess ? (
                                <ModalContent>
                                    <p>Password has been change successfully!!!</p>
                                    <Button id="button_close_changepass">
                                        <ButtonContainer>
                                            <ButtonClick
                                                onClick={() => handleCloseSuccess()}>Close</ButtonClick>
                                        </ButtonContainer>
                                    </Button>
                                </ModalContent>
                            ) : (
                                <ModalContent>
                                    <Form id="form-change_pass_word">
                                        <Label>
                                            <Title>Old password</Title>
                                            <Input
                                                onChange={(e) => setPassword(e.target.value)}
                                                id="oldPassword"
                                                name="password"
                                                type="password"
                                                className="borderDanger"
                                            />
                                        </Label>
                                        <Error>{message}</Error>
                                        <Label>
                                            <Title>New password</Title>
                                            <Input
                                                onChange={(e) => setNewPass(e.target.value)}
                                                id="newPass"
                                                name="newPassword"
                                                type="password"
                                                className="borderPrimary"
                                            />
                                        </Label>

                                    </Form>
                                    <Button>
                                        <ButtonContainer>
                                            <button
                                                id="button_change_pass_word"
                                                type="button"
                                                className={
                                                    'btn btn-login btn-danger' +
                                                    ' btn-lg ' +
                                                    (isChangePasswordNotEmpty() ? '' : 'disabled')
                                                }
                                                onClick={(e) => handleChangePassword(e)}
                                            >
                                                Save
                                            </button>
                                        </ButtonContainer>
                                        <ButtonContainer>
                                            <ButtonClick
                                                id="button_cancel_chang_pass"
                                                onClick={() => setShowModal((prev) => !prev)}>
                                                Cancel
                                            </ButtonClick>
                                        </ButtonContainer>
                                    </Button>
                                </ModalContent>
                            )}
                            <CloseModalButton aria-label="Close modal"
                                              onClick={() => setShowModal((prev) => !prev)}>
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );
    }
    if (type === "logout") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal}>
                            <H2>Are you sure?</H2>

                            <ModalContent>
                                <p>Do you want to log out?</p>
                                <Button>
                                    <ButtonContainer>
                                        <ButtonClick id="btnConfirmLogout"
                                                     onClick={() => handleLogout()}
                                        >Logout</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelLogOut"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmLogout"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );

    }

    if (type === "firstLogin") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} >
                        <ModalWrapper showModal={showModal} >
                            <H2>Change password</H2>
                            {isFirstLoginSuccess ? (
                                <ModalContent>
                                    <p>Password has been change successfully!!!</p>
                                    <Button>
                                        <ButtonContainer>
                                            <ButtonClick onClick={() => handleClosetFirstLogin()}>Close</ButtonClick>
                                        </ButtonContainer>
                                    </Button>
                                </ModalContent>
                            ) : (
                                <>
                                    <p className="text-break fs-6  m-3">This is the first time you
                                                                     logged in.
                                                                     You have to change your password to continue.</p>

                                                             <ModalContent>
                                                                 <Form name="form-first_login">
                                                                     <Label>
                                                                         <Title>New password</Title>
                                                                         <Input id="newPassword" type="password"
                                                                                className="borderPrimary"
                                                                                onChange={(e) => {
                                                                                    setNewPassword(e.target.value)
                                                                                    setErrorFirst('')
                                                                                }}
                                                                         />
                                                                     </Label>
                                                                     <Error id="messageNewPassword">{errorFirst}</Error>
                                                                 </Form>

                                                                 <Button>
                                                                     <ButtonContainer>
                                                                         <ButtonClick id="btnSaveNewPassword"
                                                                                      onClick={() => handleFirstLogin(userinfo.username, newPassword)}
                                                                         >Save</ButtonClick>
                                                                     </ButtonContainer>
                                                                 </Button>

                                                             </ModalContent>
                                </>
                            )}

                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );
     //if (type === "firstLogin") {
    //     return (
    //         <>
    //             {showModal ? (
    //                 <Background ref={modalRef}>
    //                     <ModalWrapper showModal={showModal}>
    //                         <H2>Change password</H2>
    //                         <p className="text-break fs-6  m-3">This is the first time you
    //                             logged in.
    //                             You have to change your password to continue.</p>
    //
    //                         <ModalContent>
    //                             <Form>
    //                                 <Label>
    //                                     <Title>New password</Title>
    //                                     <Input id="newPassword" type="password"
    //                                            className="borderPrimary"
    //                                            onChange={(e) => {
    //                                                setNewPassword(e.target.value)
    //                                                setErrorFirst('')
    //                                            }}
    //                                     />
    //                                 </Label>
    //                                 <Error id="messageNewPassword">{errorFirst}</Error>
    //                             </Form>
    //
    //                             <Button>
    //                                 <ButtonContainer>
    //                                     <ButtonClick id="btnSaveNewPassword"
    //                                                  onClick={() => handleFirstLogin(userinfo.username, newPassword)}
    //                                     >Save</ButtonClick>
    //                                 </ButtonContainer>
    //                             </Button>
    //
    //                         </ModalContent>
    //                     </ModalWrapper>
    //                 </Background>
    //             ) : ""}
    //         </>
    //     );
    } else {
        return (
            <></>
        );
    }
};

export default Modal;