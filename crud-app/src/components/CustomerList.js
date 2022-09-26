import React from "react"
import CreateCustomer from "./CreateCustomer"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const CustomerList = ({ customers, postCustomer, updateCustomer, deleteCustomer }) => {
    const showHideUpdateRow = id => {
        const form = document.getElementsByClassName(`show-form-${id}`)
        form[0].classList.toggle("hide-form")
    }

    const Row = ({ customer }) => {
        return (
            <>
            
                <tr>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.location}</td>
                    <td>
                        <i className="fa fa-pencil-square fa-2x text-info" onClick={() => showHideUpdateRow(customer.id)}></i>
                        <i className="fa fa-trash fa-2x text-danger" onClick={() => deleteCustomer(customer.id)}></i>    
                    </td>
                </tr>
                <tr className={`hide-form show-form-${customer.id}`}> 
                   <CreateCustomer userData={customer} postCustomer={postCustomer} updateCustomer={updateCustomer} showHideUpdateRow={showHideUpdateRow} />
                </tr>
                
            </>
        )
    }

    return (
        
            <table className="table">
                    <thead >
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {customers && customers.map(u => <Row customer={u} key={u.id} />)}
                   </tbody>
            </table>
          
        
    )
}

export default CustomerList