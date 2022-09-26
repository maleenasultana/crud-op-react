import React, { useState } from "react"
import 'font-awesome/css/font-awesome.min.css';
//import { faL } from "@fortawesome/free-solid-svg-icons";


const CreateCustomer= ({ userData = {}, postCustomer, updateCustomer,showHideUpdateRow }) => {
    const [user, setUser] = useState({
        id: userData.id ?? 0,
        name: userData.name ?? "",
        email: userData.email ?? "",
        location: userData.location ?? "",
    })

    const handleValue = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitUser = e => {
        e.preventDefault()
        debugger;
        if (user.name === "" || user.email === "" || user.location === "") return

        if (userData.id) {
            debugger;
            updateCustomer(userData.id, user)
        } else {
            postCustomer(user)
        }
        setUser({ ...user, "name": "", "email": "", "location": "" })
    }
    const hiderow = e => {
        showHideUpdateRow(userData.id);
    }
    const isAdd = !userData.id ? true : false;
    return (
        <>
            <td>
                <input
                    type='text'
                    name='name'
                    className="form-control"
                    value={user.name}
                    placeholder='Name'
                    onChange={e => handleValue(e)}
                />
            </td>
            <td>
                <input
                    type='email'
                    name='email'
                    className="form-control"
                    value={user.email}
                    placeholder='Email'
                    onChange={e => handleValue(e)}
                />
            </td>
            <td>
                <input
                    type='text'
                    name='location'
                    className="form-control"
                    value={user.location}
                    placeholder='location..'
                    onChange={e => handleValue(e)}
                />
            </td>
            <td>
                {isAdd ?
                    <input
                        className='btn btn-primary btnsubmit'
                        type='submit'
                        value={`${!userData.id ? "Add new user" : "Save user"}`}
                        onClick={submitUser}
                    /> :
                    <i className="fa fa-check fa-2x text-success" onClick={submitUser}></i>
                }
                {isAdd ? "" : <i className="fa fa-times fa-2x text-muted" onClick={hiderow}></i>}
            </td>
        </>
    )
}

export default CreateCustomer