import React from 'react';

export default props => {


    return (
        <form>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputId">ID</label>
                    <input type="number" className="form-control" id="inputId" placeholder="ID"/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="inputFirstName">FirstName</label>
                <input type="name" className="form-control" id="inputFirstName" placeholder="First Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="inputLastName">LastName</label>
                <input type="name" className="form-control" id="inputLastName"
                       placeholder="Last Name"/>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="inputPhone">Phone</label>
                    <input type="phone" className="form-control" id="inputPhone"
                           placeholder="Phone"/>
                </div>

            </div>

            <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
    )
}