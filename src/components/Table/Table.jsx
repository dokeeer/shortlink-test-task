import React, {useEffect, useState} from 'react';
import './Table.css'
import {useDispatch, useSelector} from "react-redux";
import {setOrder} from "../../redux/linklistReducer";
import copy from '../../assets/copy.svg'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const Table = (props) => {
    const { data } = props
    const isLoading = useSelector(state=>state.linklist.loading)
    const order = useSelector(state=>state.linklist.order)
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

    const copyLinkNotification = (link) => {
        Store.addNotification({
            title: 'Your link was copied!',
            message: link,
            type: 'success',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
    }
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

    const getLoading = (isLoading) => {
        if (isLoading === true) return '...'
        else return ''
    }

    const getSymbol = (type) => {
        const orderObject = (orderName.filter(obj=>{
            return obj.type === type
        }))[0]
        if (orderObject.active===false) return '-'
        return orderObject.asc === true ? '↑' : '↓'
    }

    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
    }

    const getTable = data.map(obj=>
        <tr key = {obj.id}>
            <th className='table-small row-elem' scope="row">
                <a
                    href={obj.target}
                    className='table-link'
                >
                    <div className='table-div'>
                    {obj.target}
                    </div></a>
            </th>
            <td className='row-elem'>
                <a
                    href={`http://79.143.31.216/s/${obj.short}`}
                    className='table-link'
                >
                    {obj.short}</a>
                <img
                    className='copy-img'
                    src={copy}
                    onClick={()=> {
                        copyLink(`http://79.143.31.216/s/${obj.short}`)
                        copyLinkNotification(`http://79.143.31.216/s/${obj.short}`)
                    }
                    }/> </td>
            <td className='row-elem'>{obj.counter}</td>
        </tr>
    )

    return (
        <table>
            <thead>
            <tr>
                <th className='table-target'>
                    <span
                        className='nocopy'
                        onClick={()=>changeOrder('target')}
                    >
                        Full link {getSymbol('target')}
                    </span>
                </th>
                <th className='table-short'>
                    <span
                        className='nocopy'
                        onClick={()=>changeOrder('short')}
                    >
                        Short {getSymbol('short')}
                    </span>
                </th>
                <th className='table-counter'>
                    <span
                        className='nocopy'
                        onClick={()=>changeOrder('counter')}
                    >
                        Usages {getSymbol('counter')}
                    </span>
                </th>
            </tr>
            </thead>
            <tbody>
            {getTable}
            </tbody>
            <tfoot>{getLoading(isLoading)}</tfoot>
        </table>
    );
};

export default Table;