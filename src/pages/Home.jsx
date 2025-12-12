import React, { useEffect, useState } from "react";
import service from '../services/posts' // UPDATED IMPORT
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
    const [posts, setPosts] = useState([])
    const status = useSelector((state) => state.auth.status)

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                // UPDATED: MERN backend returns the array directly, so we don't need .documents
                setPosts(posts)
            }
        })
    }, [])
    
    // Helper to check if we should show the "No posts" message
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {status ? (
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No posts available. Please create a post.
                                </h1>
                            ) : (
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to see posts.
                                </h1>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        // UPDATED: MongoDB uses _id
                        <div key={post._id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
