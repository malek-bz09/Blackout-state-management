import "./profilecard.css";
import { useState } from "react";
import Editcard from "./profileedit";


function ProfileCard(props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-card">
      <h2>{props.profile.name}</h2>

      <p className="role">
        {props.profile.role}
      </p>

      <div className="skills">
        {props.profile.skills.map(skill => (
          <span key={skill} className="skill">
            {skill}
          </span>
        ))}
      </div>
      
     
        <button className="delete-btn" onClick={() => props.onDelete(props.profile.id)}> Delete </button>

        <button className="edit-btn" onClick={() => setIsEditing(true)}> Edit </button>

  {isEditing && (
  <Editcard
    profile={props.profile}
    onEdit={props.onEdit}
    onClose={() => setIsEditing(false)}
  />
)}

    </div>
  );
}


export default ProfileCard;
     
