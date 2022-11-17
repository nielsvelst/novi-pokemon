import React from "react";

function Button({children, clickHandler, disabled}) {
    return (
        <button type="button"
                onClick={clickHandler}
                disabled={disabled}
                className="nav-button"
        >
            {children}
        </button>
    );
}

export default Button;