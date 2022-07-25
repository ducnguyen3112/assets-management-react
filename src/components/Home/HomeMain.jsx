import styled from "styled-components";
import "../../css/main.css";
import { useEffect, useRef, useState } from "react";
import { ReplayOutlined, CloseOutlined, CheckOutlined } from "@mui/icons-material";
import axios from "axios";
import Modal from "./Modal";
import Toast from "./Toast";

const Container = styled.div`
    margin-top: 50px;
`

// Recent Orders
const RecentOrders = styled.div`
    margin-top: 3.3rem;
`

const H2 = styled.h2`
    margin-bottom: 0.8rem;
    color: var(--color-primary);
`

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
    text-align: center;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &:hover {
        box-shadow: none;
    }
`

const Thead = styled.thead`

`

const Tr = styled.tr`
    &:last-child td {
        border: none;
    }
    &:hover {
        background: var(--color-light);
    }
`

const Th = styled.th`

`

const Tbody = styled.tbody`

`

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
`

const A = styled.a`
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
`

const ButtonFix = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid var(--color-warning);
    border-radius: var(--border-radius-2);
    color: var(--color-warnning);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
`

const ButtonInfo = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid var(--color-info);
    border-radius: var(--border-radius-2);
    color: var(--color-info);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
`

const ButtonDelete = styled.button`
width: 40px;
height: 30px;
border: 2px solid var(--color-danger);
border-radius: var(--border-radius-2);
color: var(--color-danger);
background: var(--color-white);
padding:0px;
outline:none;
z-index: 2;
cursor: pointer;
`

const HomeMain = ({ reRenderData, setReRenderData }) => {
    const InputRef = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [timkiem, setTimKiem] = useState("");
    const handleSeach = (e) => {
        if (isSearch === false) {
            setIsSearch(!isSearch);
            e.preventDefault();
        } else {
            // Thực hiện tìm kiếm
            console.log(timkiem);
        }
    }
    const handleClose = () => {
        setIsSearch(false);
        InputRef.current.value = "";
        console.log(InputRef.current.value);
        setTimKiem("");
    }


    // Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [danhMucModal, setDanhMucModal] = useState(null);

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.danhmuc);
    }

    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({ message: "alo alo", type: "success" });
    const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    }
    return (
        <Container>
            <RecentOrders>
                <H2>My Assignment</H2>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Asset Code</Th>
                            <Th>Asset Name</Th>
                            <Th>Category</Th>
                            <Th>Assigned Date</Th>
                            <Th>State</Th>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>LA100002</Td>
                            <Td>Laptop HP Probook 350 G1</Td>
                            <Td>Laptop</Td>
                            <Td>
                                10/04/2019
                            </Td>
                            <Td>
                                Accepted
                            </Td>
                            <Td className="danger">
                                <ButtonDelete
                                    onClick={() => openModal({ type: "TESTMODAL" })}
                                >
                                     <CheckOutlined/>
                                </ButtonDelete>
                            </Td>
                            <Td className="warning">
                                <ButtonFix>
                                    <CloseOutlined />
                                </ButtonFix>
                            </Td>
                            <Td className="info">
                                <ButtonInfo>
                                    <ReplayOutlined />
                                </ButtonInfo>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>LA100002</Td>
                            <Td>Laptop HP Probook 350 G1</Td>
                            <Td>Laptop</Td>
                            <Td>
                                10/04/2019
                            </Td>
                            <Td>
                                Accepted
                            </Td>
                            <Td className="danger">
                                <ButtonDelete
                                    onClick={() => openModal({ type: "opentest", danhmuc: "alo" })}
                                >
                                     <CheckOutlined/>
                                </ButtonDelete>
                            </Td>
                            <Td className="warning">
                                <ButtonFix>
                                    <CloseOutlined />
                                </ButtonFix>
                            </Td>
                            <Td className="info">
                                <ButtonInfo>
                                    <ReplayOutlined />
                                </ButtonInfo>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>LA100002</Td>
                            <Td>Laptop HP Probook 350 G1</Td>
                            <Td>Laptop</Td>
                            <Td>
                                10/04/2019
                            </Td>
                            <Td>
                                Accepted
                            </Td>
                            <Td className="danger">
                                <ButtonDelete
                                    onClick={() => openModal({ type: "opentest", danhmuc: "alo" })}
                                >
                                     <CheckOutlined/>
                                </ButtonDelete>
                            </Td>
                            <Td className="warning">
                                <ButtonFix>
                                    <CloseOutlined />
                                </ButtonFix>
                            </Td>
                            <Td className="info">
                                <ButtonInfo>
                                    <ReplayOutlined />
                                </ButtonInfo>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>LA100002</Td>
                            <Td>Laptop HP Probook 350 G1</Td>
                            <Td>Laptop</Td>
                            <Td>
                                10/04/2019
                            </Td>
                            <Td>
                                Accepted
                            </Td>
                            <Td className="danger">
                                <ButtonDelete
                                    onClick={() => openModal({ type: "opentest", danhmuc: "alo" })}
                                >
                                     <CheckOutlined/>
                                </ButtonDelete>
                            </Td>
                            <Td className="warning">
                                <ButtonFix
                                    // onClick={() => openModal({ type: "open", danhmuc: danhmucitem })}
                                >
                                    <CloseOutlined />
                                </ButtonFix>
                            </Td>
                            <Td className="info">
                                <ButtonInfo
                                    // onClick={() => openModal({ type: "open1", danhmuc: danhmucitem })}
                                >
                                    <ReplayOutlined />
                                </ButtonInfo>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                <A href="#">Tất cả</A>

            </RecentOrders>
            <Modal
                showModal={showModal}   //state Đóng mở modal
                setShowModal={setShowModal} //Hàm Đóng mở modal
                type={typeModal}    //Loại modal
                danhmuc={danhMucModal}  //Dữ liệu bên trong modal
                setReRenderData={setReRenderData}   //Hàm rerender khi dữ liệu thay đổi
                handleClose={handleClose}   //Đóng tìm kiếm
                showToastFromOut={showToastFromOut} //Hàm hiện toast
            />

            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>
    );
};



export default HomeMain;