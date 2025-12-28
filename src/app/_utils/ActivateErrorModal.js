import { useState } from "react";

export const useErrorModal = () => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [formError, setFormError] = useState(null);

    const activateErrorModal = (message) => {
        setFormError(message);
        setModalIsActive(true);
    };

    return {
        modalIsActive,
        setModalIsActive,
        formError,
        setFormError,
        activateErrorModal
    };
};
