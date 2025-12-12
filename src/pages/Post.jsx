import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../../services/posts"; // UPDATED IMPORT
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // UPDATED: Check ownership. 
    // MongoDB IDs are strings in JSON, but ensure userData has _id (from the authSlice update).
    // We fallback to $id if you are still using the old Redux structure, but _id is preferred.
    const isAuthor = post && userData ? post.userId === (userData._id || userData.$id) : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        // UPDATED: Use slug for deletion as per Backend Routes
        service.deletePost(post.slug).then((status) => {
            if (status) {
                // Note: File deletion is now handled by backend (or ignored for this demo)
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* UPDATED: Handle image source. If featuredImage is a full URL, use it directly. */}
                    <img
                        src={post.featuredImage.startsWith('http') ? post.featuredImage : service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            {/* UPDATED: Link to edit uses slug */}
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
