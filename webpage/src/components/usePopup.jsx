import React, { useState, useEffect } from 'react';

const usePopup = (callback) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        messages: '',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState({});

    const handleSubmit = e => {
        e.preventDefault();

        setSubmitting(true);
    };

    useEffect(() => {if (submitting){callback()}});

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]:value});
    };

    return ( { handleChange, handleSubmit, values } );
};
 
export default usePopup;