import React from 'react';

export default function ModalShell({ closeWrapper, children }) {
    // Pass closeWrapper to all valid React children
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { closeWrapper });
        }
        return child;
    });

    return <>{childrenWithProps}</>;
}