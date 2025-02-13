import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addPost = async (newPost) => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return data;
};

const Form = () => {
  const [user, setUser] = useState({
    name: "",
    title: "",
    content: "",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) => {
        const newId = Math.max(...oldPosts.map((p) => p.id), 0) + 1;
        return [{ ...newPost, id: newId }, ...oldPosts];
      });
      setUser({ name: "", title: "", content: "" });
    },
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    mutation.mutate({ title: user.title, body: user.content, name: user.name });
  };

  return (
    <div className="flex justify-center items-center p-3">
      <form
        action=""
        onSubmit={handleSubmit}
        className="border p-1 flex flex-col text-center bg-slate-800 text-white space-y-2"
      >
        <label
          className="max-w-xl p-5 font-semibold text-lg"
          htmlFor="postContent"
        >
          What would you like to post today?
        </label>

        <input
          required
          type="text"
          name="title"
          id="title"
          value={user.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-1 rounded bg-slate-500"
        />

        <input
          required
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-1 rounded bg-slate-500"
        />

        <textarea
          required
          name="content"
          id="postContent"
          rows="3"
          value={user.content}
          onChange={handleChange}
          maxLength={130}
          className="border p-1 bg-slate-500 rounded resize-none"
          placeholder="What's on your mind?"
        ></textarea>

        <button
          type="submit"
          className="cursor-pointer border bg-blue-700 rounded w-20 place-self-center"
        >
          {mutation.isPending ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default Form;
