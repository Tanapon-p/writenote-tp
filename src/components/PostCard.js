import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const PostCard = ({ post, toggle, setToggle }) => {
  const { id, title, description, author, createdAt, updatedAt } = post;

  function formatDate(unixTime) {
    const formatTime = dayjs.unix(unixTime).format("YYYY-MM-DD HH:MM:ss");
    return formatTime;
  }

  const createdDate = formatDate(createdAt.seconds);
  const updateDate = formatDate(updatedAt.seconds);

  const isAuth = JSON.parse(localStorage.getItem("isAuth"));

  async function handleDelete() {
    const document = doc(db, "post", id);
    await deleteDoc(document);
    setToggle(!toggle);
  }
  return (
    <div className="card">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <div className="control">
        <span className="author">{author.name}</span>
        <div>
          {isAuth && author.id === auth.currentUser.uid && (
            <Link to={`/edit/${id}`}>
              <span className="edit">
                <i className="bi bi-pencil "></i>
              </span>
            </Link>
          )}

          {isAuth && author.id === auth.currentUser.uid && (
            <span onClick={handleDelete} className="delete">
              <i className="bi bi-trash3"></i>
            </span>
          )}
        </div>
      </div>
      <p className="description">CreateAt: {createdDate}</p>
      {createdDate === updateDate ? (
        ""
      ) : (
        <p className="description">Lastest Update: {updateDate}</p>
      )}
    </div>
  );
};
