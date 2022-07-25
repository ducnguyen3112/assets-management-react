import React, { useState } from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import EditUserMain from "../components/ManageUser/EditUserMain";
import { useLocation } from 'react-router-dom';


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 14rem auto;
`

const EditUser = () => {
    const location = useLocation();
    return (
        <>
            <Navbar pageName="Manage User" />
            <Container>
                <Aside active="manageUser" />
                <EditUserMain data={location.state}/>
            </Container>
        </>
    )
}

export default EditUser;