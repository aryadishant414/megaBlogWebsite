import React, { useEffect, useState } from 'react'
import {useNavigate , useParams} from "react-router-dom";
import appwriteService from "../../appwrite/config";
import {Container , PostForm} from "../index"


function EditPost() {
    const [post , setPosts] = useState(null)
    const {slug} = useParams()  //"useParams" => hook hai gives us an object containing key-value pairs of the URL parameters defined in the route. and 'slug' uss object ki value.
    const navigate = useNavigate()


    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if(fetchedPost) {
                    setPosts(fetchedPost)
                }
            })
        }

        else {
            navigate('/')
        }
    } , [slug , navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost

// Note : 
// Why we are not using '.documents' with -> `setPosts(fetchedPost)` in this file ("EditPost.jsx" file) at the time of getting a single post to edit it, Like we are doing in 'getPosts'(in "AllPosts.jsx" file) => its because `getPost`: This method retrieves a single post based on the slug, and the response is likely a single post object.
// Example : 
// {
//     "id": "1",
//     "title": "Post 1",
//     "content": "Content 1"
// }