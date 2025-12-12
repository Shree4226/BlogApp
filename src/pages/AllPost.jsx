import React, {useEffect, useState} from "react";
import service from '../services/posts'; // UPDATED: Import new MERN service
import {Container, PostCard} from '../components';

export default function AllPost(){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if(posts){
                // UPDATED: backend returns the array directly, no need for .documents
                setPosts(posts) 
            }
        })
    }, [])
    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        // UPDATED: MongoDB uses _id instead of $id
                        <div key={post._id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
