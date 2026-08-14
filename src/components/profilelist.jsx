import ProfileCard from "./profilecard.jsx";

function ProfileList(props) {
  return (
    <div className="profile-list">
      {props.profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      ))}
    </div>
  );
}

export default ProfileList;