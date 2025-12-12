import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import service from '../services/posts' // UPDATED IMPORT
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost(){
    const [post, setPost] = useState(null)
    const {slug} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug) {
            service.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            }).catch((error) => {
                // console.log("Service :: getPost :: error", error)
                navigate('/')
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}
