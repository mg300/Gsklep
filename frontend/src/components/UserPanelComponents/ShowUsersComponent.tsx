import React, { useEffect, useState } from "react";
import css from "./ShowUsersComponent.module.scss";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";
function ShowUsersComponent() {
  const [userData, setUserData] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:9000/api/auth", {
          credentials: "include",
        });
        const resData = await response.json();
        setUserData(resData.user);
        setLoading(false);
      } catch (err) {}
    })();
  }, []);
  if (loading) return <SpinnerComponent size={48} loading={loading} />;
  return (
    <div className={css.usersContainer}>
      {userData?.map((user) => (
        <div className={css.user} key={user._id}>
          <span className={css.id}>{user._id}</span>
          <span className={css.prop}>{user.email}</span>
          <span className={css.prop}>{user.status}</span>
          <span className={css.prop}>{user.userType}</span>
        </div>
      ))}
    </div>
  );
}

export default ShowUsersComponent;