import "./profileform.css";
import { useState } from "react";

function Addcard({ setProfiles }) {

  const [profile, setProfile] = useState({
    name: "",
    role: "",
    skills: ""
  });

  function addProfile() {
    setProfiles(prev => [
      ...prev,
      {
        ...profile,
        id: Date.now(),
        skills: profile.skills.split(",")
      }
    ]);
  }

  return (
<div className="form-card">
  <h2>Add New Profile</h2>

  <div className="form-row">
    <div className="field">

      <label>Name</label>
      <input 
      type="text"   
      value={profile.name}
      onChange={(e) =>
    setProfile({
      ...profile,
      name: e.target.value
    })}  placeholder="Enter full name" />

    </div>

    <div className="field">



      <label>Role</label>
      <input 
       type="text"  
       value={profile.role}
       onChange={(e) =>
       setProfile({
      ...profile,
      role: e.target.value
      })} 
      placeholder="Enter role / position" />


    </div>

    <div className="field">
      <label>Skills</label>
      <input
        type="text"
        placeholder="React, JavaScript, Git"
        value={profile.skills}
        onChange={(e) =>
        setProfile({
      ...profile,
        skills: e.target.value
    })}
      />
    </div>

    <button onClick={addProfile}>Add Profile</button>
  </div>
</div>
  );
}

export default Addcard;