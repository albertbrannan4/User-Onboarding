
import React from 'react';

const Form = (props) => {
    const { values, manageState, submitMyForm, disabled,error } = props;

    const ChangeHandler = (e) => {
        const { name, value, checked, type } = e.target
        const valueToUse = type === "checkbox" ? checked : value;
        manageState(name, valueToUse)
    };

    const SubmitForm = (e) => {
        e.preventDefault();
        submitMyForm(values);

    };

    return (
        <>
            <>{error.firstName}</>
            <>{error.lastName}</>
            <>{error.email}</>
            <>{error.password}</>
            <>{error.tos}</>
            <form onSubmit={SubmitForm}>
                <label>First Name
                    <input
                        type='text'
                        name='firstName'
                        value={values.firstName}
                        onChange={ChangeHandler}
                    />
                </label>
                <label>Last Name
                    <input
                        type='text'
                        name='lastName'
                        value={values.lastName}
                        onChange={ChangeHandler}
                    />
                </label>
                <label>Email
                    <input
                        type='email'
                        name='email'
                        value={values.email}
                        onChange={ChangeHandler}
                    />
                </label>
                <label>Password
                    <input
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={ChangeHandler}
                    />
                </label>
                <label>Terms of Service:
                    <input
                        type='checkbox'
                        name='tos'
                        value={values.tos}
                        onChange={ChangeHandler}
                    />
                </label>
                <button disabled={disabled}>submit</button>
            </form>
        </>
    )
};
export default Form;