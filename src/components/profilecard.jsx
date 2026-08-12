import "./profilecard.css";

function ProfileCard(props) {
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
      
     
        <button onClick={() => props.onDelete(props.profile.id)}> Delete </button>
    

    </div>
  );
}


export default ProfileCard;
     
