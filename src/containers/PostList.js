import React from 'react'
import { Header, Item } from 'semantic-ui-react'
import { useState, useEffect } from 'react'
import Loaders from '../components/Loader'
import axios from 'axios'
import Message from '../components/Message'
import { NavLink } from 'react-router-dom'

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchPosts();
        // getRecipes();
    }, [])


    const fetchPosts = async () => {
        setLoading(true);

        try {

            console.log("old --------")
            console.log(posts)
            const res = await axios.get('http://127.0.0.1:8000/api/posts/');
            const data = res.data
            console.log("fetched data below --------")
            console.log(data)
            console.log("new state below")
            setPosts(data)




            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    return (
        <div>
            <Header>Post list</Header>

            {loading && <Loaders />}
            {error && <Message negative message={error} />}
            <Item.Group>
                {posts.map(post => (
                    <div>
                        <Item key={post.id}>
                            <Item.Image size='small' src={post.thumbnail} />

                            <Item.Content>
                                <NavLink to={`/post/${post.slug}`} >
                                    <Item.Header as='a'>{post.title}</Item.Header>
                                </NavLink>
                                <Item.Description>
                                    <p>
                                        {post.content}
                                    </p>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </div>
                ))}
            </Item.Group>

        </div>
    )
}

export default PostList;









