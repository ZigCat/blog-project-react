import axios from "axios";

export default class PostService{
    static async getAll(){
        const response = await axios.get('http://localhost:8080/api/post');
        return response;
    }

    static async getById(id){
        let url = "http://localhost:8080/api/post/id/"+id;
        const response = await axios.get(url);
        return response;
    }

    static async getByUser(userId){
        let url = "http://localhost:8080/api/post/user/"+userId;
        const response = await axios.get(url);
        return response;
    }

    static async addPost(post){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const response = axios.post(
            "http://localhost:8080/api/post/create",
            post,
            {headers}
        );
        return response;
    }

    static async update(form, postId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = "http://localhost:8080/api/post/update/"+postId;
        const response = axios.patch(url, form, {headers});
        return response;
    }

    static async delete(postId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = "http://localhost:8080/api/post/delete/"+postId;
        const response = axios.delete(url, {headers});
        return response;
    }
}