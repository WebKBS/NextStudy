import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm(props) {
  const oldPassword = useRef();
  const newPassword = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPassword.current.value;
    const enteredNewPassword = newPassword.current.value;

    // 여기에 프론트 유효성 검사

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPassword} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPassword} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
