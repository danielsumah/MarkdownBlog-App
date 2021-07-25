import React from 'react';
import {
    Container,
    Header,
    Image,
    Button,
    Icon,
  } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom';
import Message from '../components/Message';
import Loaders from '../components/Loader';
import { api } from '../api';
import { useFetch } from '../helpers';
import { useParams } from 'react-router';


const PostDetail = () => {
    const {postSlug} = useParams()    
    const {data, loading, error} = useFetch(api.get.post_detail_endpoint(postSlug))

    return (
        <div>
            <Container text style={{ marginTop: '7em' }}>
                
                <Image src={data.thumbnail} size='small'/>
                <Header as='h1'>{data.title}</Header>
                {data && (
                    <Header as='h4'>Last Updated: {`${new Date(data.last_updated).toLocaleDateString()}`}</Header>
                )}
                
                

                {loading && <Loaders />}
                {error && <Message negative message={error} />}

                {data && (
                    <>
                        <p>{data.content}</p>

                        <NavLink to={`/post/${data.slug}/update`} >
                            <Button icon labelPosition='left'>
                                <Icon name='edit' />
                                Edit Post
                            </Button>
                        </NavLink>
                    </>
                )}            
            </Container>
        
        </div>
    )
}

export default PostDetail;