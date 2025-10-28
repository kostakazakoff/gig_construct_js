import React from 'react';

export default function ModalPropsProvider({ closeWrapper, children }) {
    // Pass props only to custom React components, not DOM elements
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            // Check if it's a custom component (function/class) vs DOM element (string)
            if (typeof child.type === 'function') {
                return React.cloneElement(child, { closeWrapper });
            }
        }
        return child;
    });

    return childrenWithProps;
}