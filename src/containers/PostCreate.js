import React, {useRef} from 'react'
import { Button, Header, Form } from 'semantic-ui-react'
import { useState } from 'react'
import Message from '../components/Message'
import { history } from '../helpers'
import { api } from '../api'
import { authAxios } from '../services/authentication-services'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Redirect, useHistory } from 'react-router-dom'



const PostCreate = () => {
    const file_input_ref = useRef()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [redirect, setRedirect] = useState(false);

        // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    function handleEditorChange({ html, text }) {
        setContent(text)
    }

    const history2 = useHistory()

    if(redirect){
        history2.push('/')
        // return (
        //     <Redirect to="/" />
        // )
    }

    

    function submit_form(e){
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title',title)
        formData.append('content', content)
        formData.append('thumbnail', thumbnail)

        authAxios.post(api.post.create_endpoint,formData,{
            "headers":{
                "Content-Type":"multipart/form-data",
            }
        })
        .then(res=>{
            setLoading(false);
            // history.push();
            // setRedirect(true)
            history2.push('/')
            

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
        <div>
            <Header>Create a new post</Header>
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
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={handleEditorChange} 
                />
                
                <Button primary
                        fluid 
                        type='submit'
                >
                    Create Post
                </Button>
            </Form>
            
            {error && <Message negative message={error}/>}
        
        </div>
    
    )
}

export default PostCreate;




  
