import React, { useState, useEffect } from "react"
import CreateAgent from "./CreateCustomer"
import UserList from "./CustomerList"
import 'bootstrap/dist/css/bootstrap.min.css';

import { restAPIHelper } from "../httphelpers/restAPIHelper"

const UserAction = () => {
    const [customers, setcustomers] = useState(null)

    const url = "http://restapi.adequateshop.com/api/Customer"
    const api = restAPIHelper()

    useEffect(() => {
        getCustomers()
        // eslint-disable-next-line
    }, [])

    const postCustomer = customer => {
        api
            .postCreate(`${url}`, { body: customer })
            .then(res => getCustomers())
            .catch(err => console.log(err))
    }

    const updateCustomer = (id, customer) => {
        api
            .putUpdate(`${url}/${id}`, { body: customer })
            .then(res => getCustomers())
            .catch(err => console.log(err))
    }

    const deleteCustomer = id => {
        api
            .deletedata(`${url}/${id}`, {})
            .then(res => getCustomers())
            .catch(err => console.log(err))
    }

    const getCustomers = () => {
        api
            .get(`${url}`)
            .then(res => {
                if(res)
                {
                    setcustomers(res)
                }
            })
            .catch(err => console.log(err))
    }
    if (!customers) return null

    return (
        <>
            <h3>Add New Record</h3>
            <table>
                <tbody>
                    <tr>
                    <CreateAgent postCustomer={postCustomer} />
                    </tr>
                </tbody>
            </table>
            
            <div className='container-fluid'>
                <h3>All Tourist</h3>
                <UserList
                    customers={customers}
                    setcustomers={setcustomers}
                    postCustomer={postCustomer}
                    updateCustomer={updateCustomer}
                    deleteCustomer={deleteCustomer}
                />
            </div>
        </>
    )
}

export default UserAction