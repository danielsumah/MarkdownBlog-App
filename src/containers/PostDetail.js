import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Image,
  } from 'semantic-ui-react'
import Message from '../components/Message';
import Loaders from '../components/Loader';

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const { postSlug } = useParams()

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
                
                <Image src={post.thumbnail} size='small'/>
                <Header as='h1'>{post.title}</Header>
                <Header as='h4'>Last Updated: {`${new Date(post.last_updated).toLocaleDateString()}`}</Header>
                

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