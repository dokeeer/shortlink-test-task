import copy from "../../assets/copy.svg"
import {copyLinkNotification} from "../../helpfulFunctions/notificationFunctions"
import React from 'react'

const TableBody = (props) => {

    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
    }

    const getTable = props.data.map(obj=>
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
                    alt='copy'
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
        <tbody>
        {getTable}
        </tbody>
    );
};

export default TableBody;

