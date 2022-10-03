import React from 'react'

const Update = (tasks) => {
  return (
    {tasks.map((curr, index) => {
        return (
          <div className="input-group p-4" key={index}>
            <input readOnly type="text" className="form-control" value={curr} />
            <button className="btn btn-outline-primary" type="button">
              Edit
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => deleteItem(index)}
            >
              Delete
            </button>
          </div>
        );
      })}
  )
}

export default Update