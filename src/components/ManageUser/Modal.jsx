import styled from "styled-components";
import { CloseOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import "../../css/main.css";

import axios from "axios";
import DateFormatterService from "../../service/DateFormatterService";


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
        border: 2px solid #333;
`

const ModalContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;


    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const ModalDisableContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0;
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

const H2 = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    color: var(--color-primary);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 2px solid #333;
    width: 100%;
    height: 80px;
    margin: 0;
    background-color: #eff1f5;
`

const DetailTitle = styled.div`
`

const DetailTitleItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`
const DetailContent = styled.div`
margin-left: 50px;
`

const DetailContentItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
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

const Button = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`

// const Modal = ({ showModal, setShowModal, type, danhmuc, setReRenderData, handleClose, showToastFromOut }) => {

const Modal = ({ showModal, setShowModal, type, user, setReRenderData, handleClose, showToastFromOut }) => {
    // const Modal = ({ showModal, setShowModal, type, user}) => {
    let staffCode = ''
    let fullName = ''
    let userName = ''
    let dob = ''
    let location = ''
    let joinedDate = new Date()
    let role = ''
    let gender = ''
    if (user) {
        staffCode = user.staffCode
        fullName = user.firstName + ' ' + user.lastName
        userName = user.username
        dob = user.birthDate
        location = user.locationCode
        joinedDate = user.joinedDate
        role = user.roleName
        gender = user.gender
    }
    // const [staffCode, setStaffCode] = useState(user.staffCode);
    // const [fullName, setFullName] = useState(user.firstName + ' ' +user.lastName);
    // const [userName, setUserName] = useState(user.username);
    // const [dob, serDob] = useState(user.staffCode);
    // const [location, setLocation] = useState(user.staffCode);
    // const [joinedDate, setJoinedDate] = useState(user.staffCode);
    // const [role, setRole] = useState(user.roleName);


    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
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

    const handleDisableUser = () => {
        // Xu ly disable user
    }

    // =============== Xóa danh mục ===============
    if (type === "detailUser") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} >
                            <H2>Detailed User Information</H2>
                            <ModalContent>
                                <DetailTitle>
                                    <DetailTitleItem>Staff Code</DetailTitleItem>
                                    <DetailTitleItem>Full Name</DetailTitleItem>
                                    <DetailTitleItem>Username</DetailTitleItem>
                                    <DetailTitleItem>Date of Birth</DetailTitleItem>
                                    <DetailTitleItem>Gender</DetailTitleItem>
                                    <DetailTitleItem>Joined Date</DetailTitleItem>
                                    <DetailTitleItem>Type</DetailTitleItem>
                                    <DetailTitleItem>Location</DetailTitleItem>
                                </DetailTitle>
                                <DetailContent>
                                    <DetailContentItem>{staffCode}</DetailContentItem>
                                    <DetailContentItem>{fullName}</DetailContentItem>
                                    <DetailContentItem>{userName}</DetailContentItem>
                                    <DetailContentItem>{DateFormatterService.dateFormat(dob)}</DetailContentItem>
                                    <DetailContentItem>{gender ? 'Male' : 'Female'}</DetailContentItem>
                                    <DetailContentItem>{DateFormatterService.dateFormat(joinedDate)}</DetailContentItem>
                                    <DetailContentItem>{role}</DetailContentItem>
                                    <DetailContentItem>{location}</DetailContentItem>

                                </DetailContent>
                            </ModalContent>
                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined />
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    if (type === "confirmDisableUser") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} >
                            <H2>Are you sure?</H2>

                            <ModalDisableContent>
                                <p>Do you want to disable this user?</p>
                                <Button>
                                    <ButtonContainer>
                                        <ButtonClick
                                            onClick={() => handleDisableUser()}
                                        >Disable</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick
                                            onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalDisableContent>

                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined />
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    if (type === "canNotDisableUser") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} >
                            <H2>Can not disable user</H2>

                            <ModalDisableContent>
                                <p>There are valid assignments belonging to this user.</p>
                                <p style={{margin: "10px 0 20px 0"}}>Please close all assignments before disabling user.</p>
                            </ModalDisableContent>

                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined />
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    else {
        return (
            <></>
        );
    }
};

export default Modal;