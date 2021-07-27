import React from 'react'
import { Header, Item } from 'semantic-ui-react'
import Loaders from '../components/Loader'
import Message from '../components/Message'
import { NavLink } from 'react-router-dom'
import { api } from '../api'
import { useFetch } from '../helpers'
import './postlist.css'


const PostList = () => {
    
    const {data, loading, error} = useFetch(api.get.list_endpoint)

    return (
        <div>
            <Header>Recent Posts</Header>

            {loading && <Loaders />}
            {error && <Message negative message={error} />}
            <Item.Group>
                {data.map(post => (
                    <div key={post.id}>
                        <Item>
                            <Item.Image size='small' src={post.thumbnail} />

                            <Item.Content>
                                <NavLink to={`/post/${post.slug}`} >
                                    <Item.Header as='a'>{post.title}</Item.Header>
                                </NavLink>
                                <Item.Description>
                                    <p className="hide-part">
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









