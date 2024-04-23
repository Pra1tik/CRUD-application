import React from 'react';

import { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css";

export default function App() {
    const [post, setPost] = useState([]);
    const [newPost, setNewPost] = useState({
        // id:0,
        title:"",
        content:"",
        date:""
    });
    const [selectedPost, setSelectedPost] = useState(null);
    const [viewPost, setViewPost] = useState({
        title:"",
        content:"",
        date:""
    });
    const [openView, setOpenView] = useState(false);

    useEffect(() => {
        fetchPosts()
    }, [])
    const fetchPosts = () => {
        axios.get("http://127.0.0.1:8000/posts/")
            .then(response => setPost(response.data))
            .catch(error => console.error(error))
    }

    const handleInputChange = (e) => {
        setNewPost({...newPost, [e.target.name]:e.target.value})
    }

    const handleAddPost = () => {
        axios.post("http://127.0.0.1:8000/posts/", newPost)
            .then(response => {
                setPost([...post, response.data])
                setNewPost({
                    // id:0,
                    title:"",
                    content:"",
                    date:""
                })
            })
            .catch(error => console.error(error))
    }

    const handleUpdatePost = () => {
        axios.put(`http://127.0.0.1:8000/posts/${selectedPost.id}`, newPost)
            .then(response => {
                fetchPosts();
                setNewPost({
                    title:"",
                    content:"",
                    date:""
                });
      })
      .catch(error => console.error(error))
    }

    const handleCancelUpdatePost = () => {
        setSelectedPost(null);
        setNewPost({
            title:"",
            content:"",
            date:""
        })
    }

    const handleViewClick = async(id) => {
        // console.log(id)
        const response = await axios.get(`http://127.0.0.1:8000/posts/${id}`);
        setViewPost(response.data);
        setOpenView(true);
    }

    const handleEditClick = (post) => {
        setSelectedPost(post);
        setNewPost(post);
    }

    const handleDeleteClick = (id) => {
        axios.delete(`http://127.0.0.1:8000/posts/${id}`, )
        .then(response => {
          fetchPosts();
          setNewPost({
            title:"",
            content:"",
            date:""
          });
        })
        .catch(error => console.error(error))
    }

  return (
        // <Navigation />
        <>
            <AddPost handleInputChange={handleInputChange}
                    handleAddPost={handleAddPost}
                    selectedPost={selectedPost}
                    handleUpdatePost={handleUpdatePost}
                    handleCancelUpdatePost={handleCancelUpdatePost}
                    newPost={newPost}/>

            <ListPost post={post} 
                    handleViewClick={handleViewClick}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}/>

            {openView && (
                <>
                <div className='outer-box'>
                    <strong>Title: {viewPost.title}</strong>
                    <br />
                    <span>Content: {viewPost.content}</span>
                    <br />
                    <strong>Date: {viewPost.date}</strong>
                    <br />
                </div>
                
                <button onClick={() => setOpenView(false)}>Close</button>
                
                </>
            )}

        </>
    );
}

function AddPost({newPost, handleInputChange, selectedPost, handleAddPost, handleUpdatePost, handleCancelUpdatePost}) {
    return (
        <div className='app-container'>
            <h1>Blog App</h1>
            <div className='form-container'>
                <div className='form-inputs'>
                    {/* <input type='text' name='id' placeholder='id' value={newPost.id} onChange={handleInputChange}></input> */}
                    <input type='text' name='title' placeholder='title' value={newPost.title} onChange={handleInputChange}></input>
                    <textarea name='content' placeholder='content' value={newPost.content} onChange={handleInputChange}></textarea>
                    <input type='text' name='date' placeholder='date' value={newPost.date} onChange={handleInputChange}></input>
                </div>
            </div>

            <div className='form-buttons'>
            {
                selectedPost ? (
                    <>
                        <button onClick={handleUpdatePost}>Update</button>
                        <button onClick={handleCancelUpdatePost}>Cancel</button>
                    </>
                ) : (
                    <button onClick={handleAddPost}>Add Post</button>
                )
            } 
            </div>
        </div>
    );
}

function ListPost({post, handleViewClick, handleEditClick, handleDeleteClick}) {
    return (
        <ul className='post-list'>
            {
                post.map(p => (
                
                    <li key={p.id}>
                        {/* {console.log(p.title)} */}
                        <div>
                            <strong>{p.title}</strong>
                        </div>

                        <div className='actions'>
                            <button className='view' onClick={() => handleViewClick(p.id)}>View</button>
                            <button className='edit' onClick={() => handleEditClick(p)}>Update</button>
                            <button className='delete' onClick={() => handleDeleteClick(p.id)}>Delete</button>
                        </div>
                    </li>
                    
                ))
            }
        </ul>
    );
}

