import React from 'react';

const TableHead = ({changeOrder, getSymbol}) => {
    return (
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
    );
};

export default TableHead;