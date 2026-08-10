import "./profileform.css";

function Addcard() {
  return (
<div className="form-card">
  <h2>Add New Profile</h2>

  <div className="form-row">
    <div className="field">
      <label>Name</label>
      <input type="text" placeholder="Enter full name" />
    </div>

    <div className="field">
      <label>Role</label>
      <input type="text" placeholder="Enter role / position" />
    </div>

    <div className="field">
      <label>Skills</label>
      <input
        type="text"
        placeholder="React, JavaScript, Git"
      />
    </div>

    <button>Add Profile</button>
  </div>
</div>
  );
}

export default Addcard;