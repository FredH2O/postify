import { useQuery } from "@tanstack/react-query";

import fetchPosts from "./data.js";

const Posts = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading posts, please wait...</p>;
  if (error)
    return (
      <p>
        Error occured, {error.name} - {error.message}
      </p>
    );

  const limitedPosts = posts?.slice(0, 6) || [];

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  return (
    <>
      <h2 className="font-extralight text-5xl text-white text-center p-10 m-10 border-slate-500 border-t">
        Today's Posts
      </h2>
      <section className="grid grid-cols-2 gap-5">
        {limitedPosts.map((post) => (
          <article
            key={post.id}
            className="border border-slate-500 p-3 rounded space-y-3"
          >
            <h2 className="text-slate-200 text-xl font-semibold">
              {capitalize(post.title)}
            </h2>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-40 object-cover rounded"
              />
            )}
            <p className="text-slate-500 text-sm">
              Post by:{" "}
              <span className="text-green-400 italic">
                {post.name ? post.name : `Random User #${post.id}`}
              </span>
            </p>
            <p className="text-slate-300">{capitalize(post.body)}</p>
          </article>
        ))}
      </section>
    </>
  );
};

export default Posts;
