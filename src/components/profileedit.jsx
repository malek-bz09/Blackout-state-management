import "./profileedit.css";
import ProfileCard from "./profilecard";
import { useState } from "react";

function Editcard(props) {
  const [name, setName] = useState(props.profile.name);
  const [role, setRole] = useState(props.profile.role);
  const [skills, setSkills] = useState(props.profile.skills.join(", "));


  function handleEdit() {
  props.onEdit({
    id: props.profile.id,
    name,
    role,
    skills: skills.split(",").map(skill => skill.trim())
  });
  props.onClose();
}
  return (
  <div className="edit-form-card">
  <h2>Edit Profile</h2>

  <div className="edit-form-row">
    <div className="field">

      <label>Name</label>
      <input 
      type="text"   
        placeholder="Enter full name"  
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

    </div>

    <div className="field">



      <label>Role</label>
      <input 
       type="text"  
      placeholder="Enter role / position" 
      value={role}
      onChange={(e) => setRole(e.target.value)}
    />

    </div>

    <div className="field">
      <label>Skills</label>
      <input
        type="text"
        placeholder="React, JavaScript, Git"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
    </div>

    <button onClick={handleEdit }> Edit Profile</button>

  </div>
</div>
  );
}

export default Editcard;