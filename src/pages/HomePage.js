import { useEffect, useState, useRef } from "react";
import { useTitle } from "../hooks/useTitle.js";
import { getDocs, collection } from "firebase/firestore";
import { PostCard, SkeletonCard } from "../components";
import { db } from "../firebase/config";

export const HomePage = () => {
  const [post, setPost] = useState(new Array(2).fill(false));
  const [toggle, setToggle] = useState(false);
  useTitle("Home");
  const postRef = useRef(collection(db, "post"));

  useEffect(() => {
    async function getPost() {
      const data = await getDocs(postRef.current);
      setPost(
        data.docs.map((document) => ({ ...document.data(), id: document.id }))
      );
    }
    getPost();
  }, [postRef, toggle]);

  return (
    <section>
      {post.map((post, index) =>
        post ? (
          <PostCard
            key={post.id}
            post={post}
            toggle={toggle}
            setToggle={setToggle}
          />
        ) : (
          <SkeletonCard key={index} />
        )
      )}
    </section>
  );
};
