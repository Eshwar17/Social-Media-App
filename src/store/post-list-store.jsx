import { createContext, useReducer, useEffect } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: () => {},
  deletePost: () => {},
};

export const PostList = createContext(DEFAULT_CONTEXT);

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === 'DELETE_POST') {
    newPostList = currPostList.filter(post => post.id !== action.payload.postId);
  } else if (action.type === 'ADD_POST') {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const loadPostListFromLocalStorage = () => {
  const storedPostList = localStorage.getItem('postList');
  return storedPostList ? JSON.parse(storedPostList) : DEFAULT_POST_LIST;
};

const savePostListToLocalStorage = (postList) => {
  localStorage.setItem('postList', JSON.stringify(postList));
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, [], loadPostListFromLocalStorage);

  useEffect(() => {
    savePostListToLocalStorage(postList);
  }, [postList]);

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: 'ADD_POST',
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: 'DELETE_POST',
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: '1',
    title: 'Going to Hawaii',
    body: 'Hi friends, I am going to Hawaii for my vacations. Hope to enjoy a lot!',
    reactions: 2,
    userId: 'user-8',
    tags: ['Vacation', 'Hawaii', 'Enjoying'],
  },
  {
    id: '2',
    title: 'Passed, finally!',
    body: 'After a lot of effort, I passed my graduation.',
    reactions: 13,
    userId: 'user-12',
    tags: ['Graduation', 'Unbelievable'],
  },
];

export default PostListProvider;
