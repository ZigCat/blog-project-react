import axios from "axios";

export default class CommentService{
    static async getByPostId(postId){
        let url = "http://localhost:8080/api/comment/post/"+postId;
        const response = await axios.get(url);
        return response;
    }

    static async addComment(form){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const response = axios.post(
            "http://localhost:8080/api/comment/create",
            form,
            {headers}
        );
        return response;
    }

    static async update(form, commentId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = "http://localhost:8080/api/comment/update/"+commentId;
        const response = axios.patch(
            url,
            form,
            {headers}
        );
        return response;
    }

    static async delete(commentId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = "http://localhost:8080/api/comment/delete/"+commentId;
        const response = axios.delete(
            url,
            {headers}
        );
        return response;
    }
}