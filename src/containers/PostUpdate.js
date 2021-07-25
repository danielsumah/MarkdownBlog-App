import React, {useRef} from 'react'
import { Button, Header, Form, Image, Divider } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import Message from '../components/Message'
import { history, useFetch } from '../helpers'
import { api } from '../api'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { useParams } from 'react-router-dom'

 

const PostUpdateForm = ({postSlug, initialTitle, initialContent, initialThumbnail}) => {

    const file_input_ref = useRef()

    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [currentThumbnail, setCurrentThumbnail] = useState(initialThumbnail);
    const [thumbnail, setThumbnail] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

        // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // Finish!
    function handleEditorChange({ html, text }) {
        // console.log('handleEditorChange', html, text);
        setContent(text)
    }

    function submit_form(e){
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title',title)
        formData.append('content', content)
        formData.append('thumbnail', thumbnail)

        console.log(content)
        console.log(FormData)

        axios.put(api.post.update_endpoint(postSlug),formData,{
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
            <Header>Update Post</Header>
            <Divider/>
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
                    {currentThumbnail && (
                        <>
                        <p>Current Image:</p>
                        <Image src={currentThumbnail} size="small"/>
                        </>
                    )}
                    <br />
                    {thumbnail && (
                        <p>New Image: {thumbnail.name}</p>
                    )}
                    <Button 
                        onClick = {() => file_input_ref.current.click()}
                        onClick = {function(e){
                            e.preventDefault()
                            file_input_ref.current.click()
                        }}
                        content="Change thumbnail" 
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
                    value={content}
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={handleEditorChange} 
                />
                
                <Button primary
                        fluid 
                        type='submit'
                >
                    Update Post
                </Button>
            </Form>
        
        </div>
    )
}

const PostUpdate = ()=>{
    
    const {postSlug} = useParams()    
    const {data, loading, error} = useFetch(api.get.post_detail_endpoint(postSlug))

    return (
        <div>
            {error && <Message negative message={error}/>}
            {data && <PostUpdateForm
                postSlug={postSlug}
                initialTitle={data.title}
                initialContent={data.content}
                initialThumbnail={data.thumbnail}
            />}

        </div>
    )
}
export default PostUpdate;




  
