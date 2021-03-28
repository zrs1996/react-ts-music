import React, { useState } from 'react';
import './index.less';

interface item {
    id: string,
    title: string
    className?: string,
    img?: string,
}

interface props {
    config: item[]

}

const Tab = (props: props) => {
    const { config } = props;
    const [currentTab, setCurrentTab] = useState(null);

    const createClassName = (item: item) => {
        let name = 'com_tab_li';
        if (item.id === currentTab) name += ' com_tab_li_active';
        if (item.className) name += ` ${item.className}`;
        return name;
    }

    const renderTab = () => {
        return config.map((item, ind) => {
            return <div
                className={createClassName(item)}
                onClick={() => setCurrentTab(item.id)}
                key={`com_tab_${ind}`}>
                {item.img && <img src={item.img} />}
                {item.title}
            </div>
        });
    }

    return <div className='com_tab'>
        {renderTab()}
    </div>;
}
export default Tab;