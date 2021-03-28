import React from 'react';

interface props {
    children: React.ReactElement
}
const Entry = (props: props) => {
    const { children } = props;
    return <div id='entry'>{children}</div>
};

export default Entry;