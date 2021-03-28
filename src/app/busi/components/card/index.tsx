import React from 'react'

interface props {
    style?: {
        backgroundColor: string,
        marginBottom: string,
        borderRadius: string
    } | null
    children: React.ReactNode
}
const Card = (props: props) => {
    const { style, children } = props;
    const _style = {
        backgroundColor: '#17181a',
        marginBottom: '8px',
        borderRadius: '10px'
    }

    return <div className='card_wrapper' style={style || _style}>
       {children && <div className='card_wrapper_content'>{children}</div>}
    </div>
}
export default Card;