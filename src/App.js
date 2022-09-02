import './App.css';
import {useEffect, useState} from "react";
import Table from "./components/Table/Table";
import {Pagination} from "@mui/material";
import {makeLink, setData, setPageNum} from "./asyncFunctions";
import logoutIfNoToken from "./helpfulFunctions/logoutIfNoToken";
import {useNavigate} from "react-router-dom";
import logout from "./helpfulFunctions/logout";
import {useDispatch, useSelector} from "react-redux";

function App() {

    const [upload, setUpload] = useState(0)
    const [linkList, setLinkList] = useState([])
    const [page, setPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(0)
    const [sendLink, setSendLink] = useState('')
    const [error, setError] = useState(false)
    const order = useSelector(state=>state.linklist.order)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = (localStorage.getItem('token') !== null
            ? localStorage.getItem('token')
            : sessionStorage.getItem('token')
    )

    const getLinks = linkList.map(link=>
        <tr>
            <th scope='row'>{link.target}</th>
            <td>{link.short}</td>
            <td>{link.counter}</td>
        </tr>
    )

    const handlePageChange = (e, value) => {
        setPage(value)
    }

    useEffect(() => {
        logoutIfNoToken(navigate)
        setPageNum(setPageNumber, token)
    }, [upload])

    useEffect(() => {
        setData(order, 5, (page-1)*5, setLinkList, token)
    }, [page, upload, order])

    const handleExit = (e) => {
        e.preventDefault()
        logout(navigate, dispatch)
    }

    const handleFormChange = (e) => {
        e.preventDefault()
        setSendLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        makeLink(sendLink, token, setError)
        setUpload(prev=>prev+1)
    }

    return (
        <div className="app">
            <div className='main-content'>
                <button className='exit' onClick={handleExit}>
                    exit
                </button>
                <div className='content-header'>
                    User
                </div>
                <div className='content_link-creator'>
                    <form className='link_form' onSubmit={handleSubmit}>
                        <input value={sendLink} onChange={handleFormChange} type='text' className='form_text'/>
                        <input type='submit' value='Get link'/>
                    </form>
                    {
                        error
                        ?<div className='app-error'>
                            Link is incorrect
                         </div>
                        : ''
                    }
                </div>
                <div className='table-holder'>
                    <Table data={linkList}/>
                </div>
                <div className='table_pagination'>
                    <Pagination onChange={handlePageChange} count={pageNumber} color="primary" />
                </div>
            </div>
        </div>
    );
}

export default App;
