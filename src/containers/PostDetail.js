import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'

// render(, document.body)

import {
    Container,
    Header,
    Image,
    Button,
    Icon,
    Modal
  } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom';
import Message from '../components/Message';
import Loaders from '../components/Loader';
import { api } from '../api';
import { useFetch } from '../helpers';
import { useParams } from 'react-router';
// import axios from 'axios';
import { authAxios } from '../services/authentication-services';
import { history } from '../helpers';
// import { Button, Header, Image, Modal } from 'semantic-ui-react'

function DeleteModal({title, thumbnail, postSlug}) {
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    function delete_post(){
        setLoading(true);

        authAxios.delete(api.delete.delete_endpoint(postSlug),{
            "headers":{
                "Content-Type":"multipart/form-data",
            }
        })
        .then(res=>{
            // console.log(res);
            setLoading(false);
            // redirect to the post list page
            history.push("/");

        })
        .catch(
            err => {
                // console.log(err.message)
                setError(err.message)
                setLoading(false)
            }
        )
    }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button 
                  secondary 
                  floated="right"
                  >
                  Delete Post
                  </Button>}

    > 
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={thumbnail} wrapped />
        <Modal.Description>
          <Header>{title}</Header>
          <p>Sure you want to delete this post?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {loading && <Loaders />}
        {error && <Message negative message={error} />}
        <Button color='black' onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="Yes"
          labelPosition='right'
          icon='trash'
          onClick={delete_post}
          negative
        />
      </Modal.Actions>
    </Modal>
  )
}

const PostDetail = () => {
    const {postSlug} = useParams()    
    const {data, loading, error} = useFetch(api.get.post_detail_endpoint(postSlug))
    console.log(data)

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

                {data.is_author && (
                    <>
                        {/* <p>{data.content}</p> */}
                        <ReactMarkdown>{data.content}</ReactMarkdown>

                        <NavLink to={`/post/${data.slug}/update`} >
                            <Button icon labelPosition='left'>
                                <Icon name='edit' />
                                Edit Post
                            </Button>
                        </NavLink>
                        
                        <DeleteModal 
                            title={data.title}
                            thumbnail={data.thumbnail}
                            postSlug={postSlug}/>

                    </>
                )}            
            </Container>
        
        </div>
    )
}

export default PostDetail;