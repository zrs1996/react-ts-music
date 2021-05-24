import React, { useEffect, useState } from 'react'
import axios from 'app/axios'

const Header = () => {
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const url = `http://127.0.0.1:3000/search/default`;
        axios({
            url,
            method: 'get',
            data: {},
            success: (res: any) => {
                const data = res.data;
                setKeyword(data.showKeyword);
            },
            error: (res: any) => {
                console.log(res, 'error');
            }
        })
    }, []);

    return <div className='home_header'>
        <div className='user_home'>我的</div>
       <div className='home_search_entry'>{keyword}</div>
    </div>
}
export default Header