import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import HomeMain from "../components/Home/HomeMain";
import {useNavigate} from "react-router-dom";
import Modal from "../components/Modal";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [isUser, setIsUser] = useState(true);
    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
    }
    const userinfo=JSON.parse(localStorage.getItem('user_info'));
    useEffect(() => {
        if (userinfo!==null){
            if (userinfo.roles[0]==="ROLE_ADMIN"){
                setIsUser(false)
            }
            if (userinfo.state==='INIT'){
                openModal({type:"firstLogin"});
            }
       }

    }, []);


    const [isLogin, setIsLogin] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem('user_info')===null){
            console.log(isLogin)
            setIsLogin(false)
        }
    }, [])
    useEffect(() => {
        if (isLogin===false){
            navigate("../login", { replace: true });
        }
    }, [isLogin]);

    const [reRenderData, setReRenderData] = useState(true);   // State để Compo DanhMucRight và DanhMucMain thay đổi Effect
    return (
        <>
            <Navbar pageName="Home" dropDown={true}/>
            <Container>
                <Aside active="home" isUser={isUser} />
                <HomeMain/>
            </Container>
            <Modal
                showModal={showModal}   //state Đóng mở modal
                setShowModal={setShowModal} //Hàm Đóng mở modal
                type={typeModal}    //Loại modal
            />
        </>
    )
}

export default Home;