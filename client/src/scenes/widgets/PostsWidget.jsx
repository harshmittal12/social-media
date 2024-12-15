import { useEffect } from "react";
import PostWidget from "./PostWidget";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const fetchPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "GET",
      headers: { Authorisation: `Bearer ${token}` },
    });
    const postResponse = await response.json();
    dispatch(setPosts({ posts: postResponse }));
  };

  const fetchUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorisation: `Bearer ${token}` },
      }
    );
    const userPostResponse = await response.json();
    dispatch(setPosts({ posts: userPostResponse }));
  };

  useEffect(() => {
    if (isProfile) fetchUserPosts();
    else fetchPosts();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          firstName,
          lastName,
          location,
          description,
          likes,
          comments,
          picturePath,
          userPicturePath,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
