import React from 'react'
import './index.less';

interface props {
    title?: string,
    button?: {
        callBack():void,
        title: string
    },
    children: React.ReactNode
}
const ScrollWrapper = (props: props) => {
    const { title, button, children } = props;

    return <div className='scroll_wrapper'>
        <div className='scroll_wrapper_header'>
            {title && <div className='scroll_wrapper_title'>{title}</div>}
            {button && <div className='scroll_wrapper_button' onClick={button.callBack}>{button.title}</div>}
        </div>
       {children && <div className='scroll_wrapper_content'>{children}</div>}
    </div>
}
export default ScrollWrapper;