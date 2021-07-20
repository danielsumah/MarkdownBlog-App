import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Container,
    Header,
  } from 'semantic-ui-react'
import Message from '../components/Message';
import Loaders from '../components/Loader';

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const postSlug = useParams()

    useEffect(() => {
        fetchPosts();
    }, [])


    const fetchPosts = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/post/${postSlug}`);
            const data = res.data
            setPost(data)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    return (
        <div>
            <Container text style={{ marginTop: '7em' }}>
                <Header as='h1'>{post.title}</Header>

                {loading && <Loaders />}
                {error && <Message negative message={error} />}

                {post && (
                    <p>{post.content}</p>
                )}            
            </Container>
        </div>
    )
}

export default PostDetail;