import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import "../../css/main.css";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from 'react-paginate';
import { ReplayOutlined, CloseOutlined, CheckOutlined, CreateOutlined, FilterAltOutlined, SearchOutlined, ArrowDropDownOutlined, ArrowDropUpOutlined, South } from "@mui/icons-material";
import Modal from "./Modal";
import Toast from "./Toast";
import UserService from "../../service/UserService";
import DateFormatterService from "../../service/DateFormatterService";
import './css/pagination.css'



const Container = styled.div`
    margin-top: 100px;
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
    padding: var(--card-padding);
    text-align: left;
    transition: all 300ms ease;
`

const Thead = styled.thead`

`

const Tr = styled.tr`

    &:hover {
        background: var(--color-light);
    }
`

const Tbody = styled.tbody`

`

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
`

const A = styled.a`
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
`

// Tìm kiếm
const SearchWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 57%;
    box-shadow: var(--box-shadow);
    &.active {
        box-shadow: none;
    }
`

const Input = styled.input`
    width: 100%;
    height: auto;
    padding: 0px 50px 0 20px;
    border-radius: 5px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-dark);
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

const ButtonDelete = styled.button`
    width: 30px;
    height: 30px;
    border: 2px solid var(--color-danger);
    border-radius: 100%;
    color: var(--color-danger);
    background: var(--color-white);
    padding:0px;
    outline:none;
    z-index: 2;
    cursor: pointer;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Filter = styled.div`
  margin: 20px;
  display: flex;
  border: 1px solid #333;
  border-radius: 5px;
`

const FilterIcon = styled.div`
    border-left: 1px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const Select = styled.select`
    border-radius: 5px;
    padding: 10px;    
`

const Option = styled.option``

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const RightOption = styled.div`
    display: flex;
    flex-direction: row;
`

const SearchContainer = styled.div`
    margin: 20px;
    display: flex;
    border: 1px solid #333;
    border-radius: 5px;
`

const SearchIcon = styled.div`
    border-left: 1px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: auto;
`

const AddContainer = styled.div`
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
`

const Item = styled.div`
    width: 170px;
    height: 30px;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem var(--card-padding);
    border-radius: 5px;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &.add-product {
        background-color: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            background: var(--color-primary);
            color: white;
            cursor: pointer;
        }
        & div {
            display: flex;
            justify-items: center;
            gap: 0.6rem;
        }
    }
`

const Th = styled.th`

    border-bottom: 1px solid #34383c;
    min-width: 100px;
    color: #34383c;
`

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ThSpan = styled.span`
`

const ThSortIcon = styled.div`
`

const ManageUserMain = ({ reRenderData, setReRenderData }) => {
    const navigate = useNavigate();

    const [isSortStaffCode, setIsSortStaffCode] = useState(false);
    const [isSortFullName, setIsSortFullName] = useState(false);
    const [isSortJoinedDate, setIsSortJoinedDate] = useState(false);
    const [isSortType, setIsSortType] = useState(false);
    const [order, setOrder] = useState("ASC")
    const [roleName, setRoleName] = useState('All')


    const handleClickSortStaffCode = (col) => {
        setIsSortStaffCode(prev => !prev);

        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("ASC")
        }

    }
    const handleClickSortFullName = (col) => {
        setIsSortFullName(prev => !prev);

        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("ASC")
        }
    }
    const handleClickSortJoinedDate = (col) => {
        setIsSortJoinedDate(prev => !prev);

        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("ASC")
        }
    }
    const handleClickSortType = (col) => {
        setIsSortType(prev => !prev);
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("ASC")
        }

    }


    // Modal
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [danhMucModal, setDanhMucModal] = useState(null);

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.user);
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

    //hanlde api 

    //users state    
    const [dataRes, setDataRes] = useState({})
    const [users, setUsers] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const [searching, setSearching] = useState('')
    //fetch list users
    useEffect(() => {
        console.log('rolename ' + roleName + ' pageNo ' + pageNo);
        if (roleName === 'All') {
            console.log('All is called');
            UserService.fetchUsers(pageNo)
                .then(res => {
                    console.log(res.data);
                    //setDataRes(res.data)
                    setUsers(res.data.userContent)
                    setTotalPage(res.data.totalPages)
                    setPageNo(res.data.pageNo)
                })
                .catch(err => console.log(err))
        }
        else if (roleName === 'Admin' || roleName === 'Staff') {
            UserService.filterUsersByRole(roleName, pageNo)
                .then(res => {
                    //setDataRes(res.data)
                    console.log(res.data);
                    setUsers(res.data.userContent)
                    setPageNo(res.data.pageNo)
                    setTotalPage(res.data.totalPages)
                })
                .catch(err => console.log(err))
        }
        else if (searching) {

            UserService.searchByText(searching, pageNo)
                .then(res => {
                    //console.log(res.data)
                    setUsers(res.data.userContent)
                    setPageNo(res.data.pageNo)
                    setTotalPage(res.data.totalPages)
                })
                .catch(err => console.log(err))
        }

    }, [pageNo])

    // const dateFormatter = (value) => {
    //     var date = new Date(value)
    //     return date.toLocaleDateString()
    // }

    //change page
    const changePage = ({ selected }) => {
        setPageNo(selected)
        console.log('rolename ' + roleName + ' pageNo ' + pageNo);

    }
    //sorting handler
    //filter
    const handleFilters = (e) => {
        const role = e.target.value
        setRoleName(roleName)
        setPageNo(0)
        // useEffect(() => {
        if (role === 'All') {
            setRoleName(role)
        }
        else if (role === 'Admin') {
            setRoleName(role)

        }
        else if (role === 'Staff') {
            setRoleName(role)
        }

        console.log('rolename ' + roleName + ' pageNo ' + pageNo);

        UserService.filterUsersByRole(role, 0)
            .then(res => {
                console.log(res.data);
                setUsers(res.data.userContent)
                setPageNo(res.data.pageNo)
                setTotalPage(res.data.totalPages)
            })
            .catch(err => console.log(err))
        // }, [pageNo])


    }
    //searching handler
    const [text, setText] = useState('')

    const searchingHandler = (e) => {
        document.getElementById('all').selected = true;
        let textSearch = ''
        setPageNo(0)

        if (e) {
            setText(e.target.value)
            textSearch = e.target.value
            setSearching(textSearch)
        }
        UserService.searchByText(textSearch, 0)
            .then(res => {
                console.log(res.data)
                setUsers(res.data.userContent)
                setPageNo(res.data.pageNo)
                setTotalPage(res.data.totalPages)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <H2>User List</H2>
            <OptionContainer>
                <FilterContainer>
                    <Filter>
                        <Select id="ManageUser_Select" name="gioitinhthucung" onChange={(e) => handleFilters(e)}>
                            <Option value="All" id="all">All</Option>
                            <Option value="Admin" id='admin'>Admin</Option>
                            <Option value="Staff" id='staff'>Staff</Option>
                        </Select>
                        <FilterIcon>
                            <FilterAltOutlined />
                        </FilterIcon>
                    </Filter>
                </FilterContainer>

                <RightOption>
                    <SearchContainer>
                        <Input type="text" placeHolder="Nhập vào mã danh mục"
                            id="textSearch"
                            onChange={(e) => searchingHandler(e)}
                        />
                        <SearchIcon onClick={() => searchingHandler()}>
                            <SearchOutlined />
                        </SearchIcon>
                    </SearchContainer>
                    <AddContainer>
                        <Item className="add-product"
                            onClick={() => navigate("/create-new-user")}
                        >
                            <h3>Create new user</h3>
                        </Item>
                    </AddContainer>
                </RightOption>
            </OptionContainer>

            <Table>
                <Thead>
                    <Tr>
                        <Th>
                            <ThContainer
                                onClick={() => handleClickSortStaffCode("staffCode")}
                            >
                                <ThSpan>Staff Code</ThSpan>
                                <ThSortIcon>
                                    {
                                        isSortStaffCode ?
                                            <ArrowDropUpOutlined />
                                            :
                                            <ArrowDropDownOutlined />
                                    }
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>
                            <ThContainer
                                onClick={() => handleClickSortFullName("firstName")}
                            >
                                <ThSpan>Full Name</ThSpan>
                                <ThSortIcon>
                                    {
                                        isSortFullName ?
                                            <ArrowDropUpOutlined />
                                            :
                                            <ArrowDropDownOutlined />
                                    }
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        <Th>Username</Th>
                        <Th>
                            <ThContainer
                                onClick={() => handleClickSortJoinedDate("joinedDate")}
                            >
                                <ThSpan>Joined Date</ThSpan>
                                <ThSortIcon>
                                    {
                                        isSortJoinedDate ?
                                            <ArrowDropUpOutlined />
                                            :
                                            <ArrowDropDownOutlined />
                                    }
                                </ThSortIcon>
                            </ThContainer>
                        </Th >
                        <Th>
                            <ThContainer
                                onClick={() => handleClickSortType("roleName")}
                            >
                                <ThSpan>Type</ThSpan>
                                <ThSortIcon>
                                    {
                                        isSortType ?
                                            <ArrowDropUpOutlined />
                                            :
                                            <ArrowDropDownOutlined />
                                    }
                                </ThSortIcon>
                            </ThContainer>
                        </Th>
                        {/* <Th></Th>
                        <Th></Th> */}
                    </Tr >
                </Thead >
                <Tbody>
                    {
                        users.map(user =>

                            <Tr id={user.staffCode}  key={user.staffCode}>
                                <Td onClick={() => openModal({ type: "detailUser", user: user })} >{user.staffCode}</Td>
                                <Td onClick={() => openModal({ type: "detailUser", user: user })} >{user.firstName + ' ' + user.lastName}</Td>
                                <Td onClick={() => openModal({ type: "detailUser", user: user })}>{user.username}</Td>
                                <Td onClick={() => openModal({ type: "detailUser", user: user })} >
                                    {DateFormatterService.dateFormat(user.joinedDate)}
                                </Td>
                                <Td onClick={() => openModal({ type: "detailUser", user: user })}>
                                    {user.roleName || 'N/A'}
                                </Td>
                                <Td className="warning" style={{border: "none"}}>
                                    <ButtonFix
                                        onClick={() => { navigate("/edit-user", { state: { staffCode: user.staffCode, firstName: user.firstName, lastName: user.lastName, birthDate: user.birthDate, joinedDate: user.joinedDate, gender: user.gender, roleName: user.roleName } }) }}
                                    >
                                        <CreateOutlined />
                                    </ButtonFix>
                                </Td>
                                <Td className="danger" style={{border: "none"}}>
                                    <ButtonDelete>
                                        <CloseOutlined />
                                    </ButtonDelete>
                                </Td>
                            </Tr>
                        )
                    }

                </Tbody>
            </Table >
            {/* <A href="#">Tất cả</A> */}


            < Modal
                showModal={showModal}   //state Đóng mở modal
                setShowModal={setShowModal} //Hàm Đóng mở modal
                type={typeModal}    //Loại modal
                user={danhMucModal}  //Dữ liệu bên trong modal

                setReRenderData={setReRenderData}   //Hàm rerender khi dữ liệu thay đổi
                showToastFromOut={showToastFromOut} //Hàm hiện toast
            />

            {/* === TOAST === */}
            < Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />

            <ReactPaginate
                initialPage={0}
                forcePage={pageNo}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={totalPage}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previousBtn"}
                nextClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}

            />

        </Container >
    );
};



export default ManageUserMain;