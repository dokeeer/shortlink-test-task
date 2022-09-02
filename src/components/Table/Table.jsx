import React, {useEffect, useState} from 'react';
import './Table.css'
import {useDispatch, useSelector} from "react-redux";
import {setOrder} from "../../redux/linklistReducer";

const Table = (props) => {
    const { data } = props
    const getTable = data.map(obj=>
        <tr key = {obj.id}>
            <th scope="row">{obj.target}</th>
            <td>{obj.short}</td>
            <td>{obj.counter}</td>
        </tr>
    )
    const order = useSelector(state=>state.linklist.order)
    const dispatch = useDispatch()

    const [orderName, setOrderName] = useState([
        {
            type: 'short',
            asc: false,
            active: true
        },
        {
            type: 'target',
            asc: false,
            active: false
        },
        {
            type: 'counter',
            asc: false,
            active: false
        }
    ])
    useEffect(()=>{
        const orderObject = (orderName.filter(obj=>{
            return obj.active === true
        }))[0]
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

    const getSymbol = (type) => {
        const orderObject = (orderName.filter(obj=>{
            return obj.type === type
        }))[0]
        if (orderObject.active===false) return '-'
        return orderObject.asc === true ? '↑' : '↓'
    }

    return (
        <table>
            <thead>
            <tr>
                <th onClick={()=>changeOrder('target')}>
                    Full link {getSymbol('target')}
                </th>
                <th onClick={()=>changeOrder('short')}>
                    Short link {getSymbol('short')}
                </th>
                <th onClick={()=>changeOrder('counter')}>
                    Usages {getSymbol('counter')}
                </th>
            </tr>
            </thead>
            <tbody>
            {getTable}
            </tbody>
        </table>
    );
};

export default Table;