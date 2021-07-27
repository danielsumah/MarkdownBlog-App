const baseURL = process.env.NODE_ENV === "development"? "http://127.0.0.1:8000" : "https://mydomain.com"

export const api = {
    auth:{
        login: `${baseURL}/dj-rest-auth/login/`,
        signup: `${baseURL}/dj-rest-auth/registration/`,

    },
    get:{
        list_endpoint:`${baseURL}/api/posts/`,
        post_detail_endpoint: slug => `${baseURL}/api/post/${slug}/`,
    },

    post:{
        create_endpoint: `${baseURL}/api/post/create/`,
        update_endpoint: slug => `${baseURL}/api/post/${slug}/update/`,
    },


    delete:{
        delete_endpoint: slug => `${baseURL}/api/post/${slug}/delete/`
    }
}