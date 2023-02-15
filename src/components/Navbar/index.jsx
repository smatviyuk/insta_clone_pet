import "./styles.css";
import UserBadge from "../UserBadge";

const Navbar = ({ nickName, avatarUrl, id }) => {
  return (
    <div className="cnNavbarRoot">
      <div className="cnNavbarWrapper">
        <a href="/" className="cnNavbarLink">
          insta clone
        </a>
        <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id} />
      </div>
    </div>
  );
};

export default Navbar;
