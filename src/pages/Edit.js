import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postReference = doc(db, "post", id);
  const [post, setPost] = useState(null);

  useTitle("Edit");

  /////////// GET DOCUMENT BY ID ///////////
  useEffect(() => {
    async function getPostById() {
      const postReference = doc(db, "post", id);
      const singlePost = await getDoc(postReference);
      if (singlePost.exists()) {
        setPost(singlePost.data());
      } else {
        console.log("No Such Document");
      }
    }
    getPostById();
  }, [id]);

 
  /////////// GET DOCUMENT BY ID ///////////

  /////////// EDIT DOCUMENT BY ID ///////////
  async function handleEditPost(event) {
    event.preventDefault();
    const document = {
      title: event.target.title.value,
      description: event.target.description.value,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
      updatedAt: serverTimestamp(),
    };
    await updateDoc(postReference, document);
    navigate("/");
  }
  /////////// EDIT DOCUMENT BY ID ///////////

  return (
    <section className="create">
      <div className="heading">
        <h1>Edit the Post</h1>
      </div>

      {post ? (
        <form className="createPost" onSubmit={handleEditPost}>
          <input
            type="text"
            className="title"
            name="title"
            placeholder="Title"
            maxLength="50"
            defaultValue={post.title}
            required
          />
          <textarea
            type="text"
            className="description"
            name="description"
            placeholder="Description"
            maxLength="600"
            defaultValue={post.description}
            required
          ></textarea>
          <button type="submit" className="submit">
            Update
          </button>
        </form>
      ) : (
        <p>Loading....</p>
      )}
    </section>
  );
};
