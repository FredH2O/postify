import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const imagesOption = [
  "/postify/images/image-1.png",
  "/postify/images/image-2.png",
  "/postify/images/image-3.png",
  "/postify/images/image-4.png",
];

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
    image: "",
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      console.log("Mutation success! Data received:", data); // Check if this logs
      queryClient.setQueryData(["posts"], (oldPosts) => [
        data,
        ...(oldPosts || []),
      ]);
      setUser({ name: "", title: "", content: "", image: "" });
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageSelect = (event) => {
    setUser({ ...user, image: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.image) {
      alert("Please select an image!");
      return;
    }

    console.log(user);

    mutation.mutate({
      title: user.title,
      body: user.content,
      image: user.image,
      name: user.name,
    });
  };

  return (
    <div className="flex justify-center items-center p-3">
      <form
        onSubmit={handleSubmit}
        className="border rounded px-6 py-3 flex flex-col text-center border-slate-600 bg-slate-800 text-white gap-6"
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
          placeholder="Username"
          className="border p-1 rounded bg-slate-500"
        />

        <label className="text-left font-semibold">Select an image:</label>
        <div className="flex flex-wrap justify-center gap-2">
          {imagesOption.map((img, index) => (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="image"
                value={img}
                checked={user.image === img}
                className="hidden"
                onChange={handleImageSelect}
                aria-label={`Select Image ${index + 1}`}
              />
              <div
                className={`border rounded-lg p-1 transition ${
                  user.image === img
                    ? "border-blue-500 shadow-md scale-105"
                    : "border-gray-300"
                } hover:border-blue-400 hover:shadow-sm`}
              >
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            </label>
          ))}
        </div>

        <textarea
          required
          name="content"
          id="postContent"
          rows="3"
          value={user.content}
          onChange={handleChange}
          maxLength={130}
          className="border p-3 bg-slate-500 rounded resize-none"
          placeholder="What would you like to share?"
        ></textarea>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer border bg-green-400 text-slate-800 border-slate-500 rounded w-20 place-self-center"
        >
          {mutation.isPending ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default Form;
