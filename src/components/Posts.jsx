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
  if (error) return <p>Error occureder, {(error.name, error.message)}</p>;

  return (
    <section className="grid grid-cols-2 gap-5">
      {posts.slice(0, 6).map((post) => (
        <article
          key={post.id}
          className="border border-slate-500 p-3 rounded space-y-3"
        >
          <h2 className="text-slate-200 text-xl font-semibold">
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </h2>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full h-40 object-cover rounded"
            />
          )}
          <p className="text-slate-500 text-sm">Anonymous User #{post.id}</p>
          <p className="text-slate-300">
            {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
          </p>
        </article>
      ))}
    </section>
  );
};

export default Posts;
