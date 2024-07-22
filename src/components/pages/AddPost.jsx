import React from 'react'
import {Container , PostForm} from "../index"

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost

// Note : 
// `AddPost.jsx` file => renders (loads the post form) a form for creating a new post.