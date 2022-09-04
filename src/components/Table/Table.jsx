import React, {useEffect, useState} from 'react'
import './Table.css'
import {useDispatch, useSelector} from "react-redux"
import {setOrder} from "../../redux/linklistReducer"
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import TableBody from "./TableBody"
import TableHead from "./TableHead"

const Table = (props) => {
    const { data } = props
    const isLoading = useSelector(state=>state.linklist.loading)
    const dispatch = useDispatch()

    const [orderName, setOrderName] = useState([
        {
            type: 'short',
            asc: false,
            active: false
        },
        {
            type: 'target',
            asc: false,
            active: true
        },
        {
            type: 'counter',
            asc: false,
            active: false
        }
    ])



    useEffect(()=>{
        const orderObject = (orderName.find(obj=>
            obj.active === true
        ))
        const sortType = orderObject.asc === true? 'asc' : 'desc'
        const queryString = `${sortType}_${orderObject.type}`
        dispatch(setOrder(queryString))
    },[orderName])

    const changeOrder = (order) => {
        setOrderName(prev=>{
            return prev.map(obj=>{
                if (obj.type === order) return {
                    ...obj,
                    active: true,
                    asc: !obj.asc
                }
                else return {
                    ...obj,
                    active: false,
                    asc: false
                }
            })
        })
    }

    const getLoading = (isLoading) => {
        if (isLoading === true) return '...'
        else return ''
    }

    const getSymbol = (type) => {
        const orderObject = (orderName.find(obj=>
            obj.type === type
        ))
        if (orderObject.active===false) return '-'
        return orderObject.asc === true ? '↑' : '↓'
    }

    return (
        <table>
            <TableHead changeOrder={changeOrder} getSymbol={getSymbol}/>
            <TableBody data={data}/>
            <tfoot>{getLoading(isLoading)}</tfoot>
        </table>
    );
};

export default Table;