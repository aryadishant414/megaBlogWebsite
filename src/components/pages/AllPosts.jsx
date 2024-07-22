import React, { useEffect, useState } from 'react'
import {Container , PostCard} from "../index"
import appwriteService from "../../appwrite/config";

function AllPosts() {

    const [posts , setPosts] = useState([])

    useEffect(() => {} , [])  // Filhaal too hamne 'useEffect' ko use kiya hai nhi filhaal too ye empty hai abb kya pata shyd hamm baadme iska use krle. islie rkh rhe hai but as such ye yaha kuch bhi kaam nhi kar rha hai so if we want to Remove it from here then sure we can

    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((eachPost) => (
                    <div key={eachPost.$id} className='p-2 w-1/4'>
                        <PostCard {...eachPost} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts

// NOte :
// Why we are using '.documents' in ->  `setPosts(posts.documents)`
// => its because "getPosts": This method retrieves a list of posts, and the response might include a property like documents which is an array of posts.
// Example : 
// {
//     "total": 10,
//     "documents": [
//         { "id": "1", "title": "Post 1", "content": "Content 1" },
//         { "id": "2", "title": "Post 2", "content": "Content 2" }
//         // more posts...
//     ]
// }