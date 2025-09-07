import React from 'react';

const UsersForm = () => {
    return( 

<div className="mx-2 mt-2">
    <div className="row">
        <div className="card col-md-8 form-container">
            <div className="card-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                     name="name"
                     className="form-control" 
                     id="name" 
                     placeholder="Jhon Doe"/>
                </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                     name='email'
                     className="form-control" 
                     id="email" 
                     placeholder="yourname@example.com"/>
                </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                     name='password'
                     className="form-control" 
                     id="password" 
                     placeholder="*********"/>
                </div>
            <button type ="submit" className='btn btn-warning w-100'>Save </button>
            </form>
         </div>
      </div>
    </div>
</div>    
    )
    }
    export default UsersForm;