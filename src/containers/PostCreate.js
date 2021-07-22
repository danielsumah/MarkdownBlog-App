import React, {useRef} from 'react'
import { Button, Header, Form } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import Message from '../components/Message'
import { history } from '../helpers'
import { api } from '../api'

const PostCreate = () => {

    const file_input_ref = useRef()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    function submit_form(e){
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append('title',title)
        formData.append('content', content)
        formData.append('thumbnail', thumbnail)

        console.log(FormData)

        axios.post(api.post.create_endpoint,formData,{
            "headers":{
                "Content-Type":"multipart/form-data",
                "Authorization":"Token 61c1d3b0770ca6d9ede2b49ca4cd7ec6c07a408d"
            }
        })
        .then(res=>{
            console.log(res);
            setLoading(false);
            // redirect to the post list page
            history.push("/");

        })
        .catch(
            err => {
                console.log(err.message)
                setError(err.message)
                setLoading(false)
            }
        )
    }

    return (
        <div>
            <Header>Create a new post</Header>
            {error && <Message negative message={error}/>}
            <Form onSubmit={submit_form}>
                <Form.Field>
                <label>Post Title</label>
                <input 
                    placeholder='Enter Post title here'
                    value={title}
                    onChange = {e => setTitle(e.target.value)}
                />
                </Form.Field>

                <Form.Field>
                    {thumbnail && (
                        <p>Selected Image: {thumbnail.name}</p>
                    )}
                    
                    <Button 
                        fluid
                        onClick = {() => file_input_ref.current.click()}
                        onClick = {function(e){
                            e.preventDefault()
                            file_input_ref.current.click()
                        }}
                        content="upload thumbnail" 
                        labelPosition="left" 
                        icon="file"
                    />
                    <input 
                        ref={file_input_ref}  
                        type="file" 
                        hidden
                        onChange = {e=> setThumbnail(e.target.files[0])}
                    />
                </Form.Field>
                <Form.TextArea 
                    label='Post Content' 
                    placeholder='Write Post content here' 
                    value= {content}
                    onChange = {e => setContent(e.target.value)}
                />
                <Button primary
                        fluid 
                        type='submit'
                >
                    Create Post
                </Button>
            </Form>
        </div>
    )
}

export default PostCreate;




  
