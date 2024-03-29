import React, { useEffect, useState } from "react";
import css from "./ProfileInfoComponent.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/appHooks";
import { UIActions } from "../../store/UI";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/user";
import NotAuthComponent from "../CommonComponents/NotAuthComponent";
import formatDate from "../../utils/formatDate";
import SpinnerComponent from "../CommonComponents/SpinnerComponent";

function ProfileInfoComponent() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userLoggedIn = useAppSelector((state: RootState) => state.user.loggedIn);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<{
    email: string;
    userType: string;
    status: string;
    createdAt: string;
  }>({ email: "", userType: "", status: "", createdAt: "" });
  useEffect(() => {
    (async () => {
      try {
        dispatch(userActions.isAuth());
        const response = await fetch(`${process.env.REACT_APP_URL}/api/auth/user`, {
          credentials: "include",
        });
        const resData = await response.json();
        if (!response.ok) {
          const error: Error = new Error(`Request failed with status ${response.status}`);
          error.statusCode = response.status;
          throw error;
        } else {
          const date = new Date(resData?.data?.createdAt);
          resData.data.createdAt = formatDate(date);
          setData(resData.data);
          setLoading(false);
        }
      } catch (err: any) {
        if (err.statusCode === 401) {
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Nie jesteś zalogowany",
            })
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else
          dispatch(
            UIActions.showWarning({
              flag: "red",
              text: "Błąd połączenia z serwerem",
            })
          );
      }
    })();
  }, [dispatch, navigate]);
  if (!userLoggedIn) return <NotAuthComponent />;
  return (
    <div className={css.profileContainer}>
      <div className={css.title}>Profil</div>
      <div className={css.left}>E-mail</div>
      <div className={css.right}>{data.email}</div>
      <div className={css.left}>Typ uzytkownika</div>
      <div className={css.right}>{data.userType}</div>
      <div className={css.left}>Status</div>
      <div className={css.right}>{data.status}</div>
      <div className={css.left}>Data utworzenia</div>
      <div className={css.right}>{data.createdAt}</div>
      <SpinnerComponent loading={loading} size={48} />
    </div>
  );
}

export default ProfileInfoComponent;
