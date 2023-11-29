import { useContext } from "react"
import { useRef } from "react"
import { PostList } from "../store/post-list-store"

function CreatePost() {
  const {addPost} = useContext(PostList)
  const userIdElement = useRef()
  const postTitleElement = useRef()
  const postBodyElement = useRef()
  const reactionsElement = useRef()
  const tagsElement = useRef()

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");
    userIdElement.current.value = ""
    postTitleElement.current.value=""
    postBodyElement.current.value=""
    reactionsElement.current.value=""
    tagsElement.current.value=""
    addPost(userId,postTitle,postBody,reactions,tags);
  }

  return (
    <form className="create-post" onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="userId" className="form-label">Enter your ETC</label>
    <input type="text" className="form-control" ref={userIdElement} id="userId" placeholder="Deadline Date"/>
  </div>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Task Name</label>
    <input type="text" className="form-control" ref={postTitleElement} id="title" placeholder="Task Name please"/>
  </div>
  <div className="mb-3">
    <label htmlFor="body" className="form-label">Task Description</label>
    <textarea rows={4} type="text" className="form-control" id="body" ref={postBodyElement} placeholder="Tell us about your task"/>
  </div>
  <div className="mb-3">
    <label htmlFor="reactions" className="form-label">Number of days required</label>
    <input type="text" className="form-control" ref={reactionsElement} id="reactions" placeholder="Enter the number of days needed"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tags" className="form-label">Enter your tags</label>
    <input type="text" className="form-control" ref={tagsElement} id="tags" placeholder="Please enter your tags here using space"/>
  </div>
  <button type="submit" className="btn btn-primary">Post</button>
</form>
  )
}

export default CreatePost