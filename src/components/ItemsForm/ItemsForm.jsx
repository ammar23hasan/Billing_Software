const ItemsForm = () => {
    return (
        <div className="ithmes-form-container" style={{color: 'black',height:'100vh', overflowY:'auto',overflowX:'hidden'}}>


 <div className="mx-2 mt-2">    
    <div className="row">
        <div className="card col-md-8 form-container">
            <div className="card-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        <img src="https://placehold.co/48x48" alt="" width={48}/> 
                    </label>
                    <input type="file"  name ="image" id="image" className="form-control" hidden/>
                </div>
        
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"
                    name="name"
                     className="form-control" 
                     id="name" 
                     placeholder="Item Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select name="category" id="category" className="form-control">
                        <option value="">--SELECT CATEGORY--</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label> 
                    <br/>
                    <input type="number" name="price" id="price" className="form-label" placeholder="&#8733;200.00"/>
                </div >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Description</label>
                    <textarea 
                     rows="5"
                     name="description"
                     className="form-control" 
                     id="description" 
                     placeholder="Write content here.."/>
                      </div>
                <button type = "submit "className = "btn btn-warning w-100">Save</button>
                
            </form>
         </div>
      </div>
    </div>
  </div>
</div> 
     )
}       
export default ItemsForm;