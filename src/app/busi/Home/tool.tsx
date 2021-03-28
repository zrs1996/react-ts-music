import React, { useEffect, useState } from 'react'
import { query } from 'app/axios'

const Tool = () => {
    const [iconList, setIconList] = useState([])

    useEffect(() => {
        const url = 'http://localhost:3000/homepage/dragon/ball'
        query(url).then(res => {
            setIconList(res.data)
        })
    }, []);

    const renderTool = () => {
        return iconList.map((item, ind) => {
            return <div className='home_tool_li' key={item.id + 'home_tool'}>
                <div className='home_tool_img'>
                    <img src={item.iconUrl} />
                    {ind === 0 && <div className='home_tool_today'>{new Date().getDate()}</div>}
                </div>
                <div className='home_tool_name'>{item.name}</div>
            </div>
        })
    }

    return <div className='home_tool'>
        <div className='home_tool_ul'>{renderTool()}</div>
    </div>

}
export default Tool