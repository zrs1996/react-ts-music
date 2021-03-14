import React from 'react';

const Entry = (props) => {
    const { children } = props;
    return <div id='entry'>{children}</div>
};

export default Entry;