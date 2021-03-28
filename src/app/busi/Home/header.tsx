import React, { useEffect, useState } from 'react'
import { query } from 'app/axios'

const Header = () => {
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const url = `http://localhost:3000/search/default`;
        query(url).then(res => {
            console.log(res)
            if (res.code === 200) {
                const data = res.data;
                setKeyword(data.showKeyword);
            }
        })
    }, []);

    return <div className='home_header'>
        <div className='user_home'>我的</div>
       <div className='home_search_entry'>{keyword}</div>
    </div>
}
export default Header