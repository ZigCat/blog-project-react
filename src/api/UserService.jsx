import axios from "axios";

export default class UserService{
    static async addUser(form){
        const response = await axios
            .post(
                'http://localhost:8080/api/user/register',
                form);
        return response;
    }

    static async login(authString){
        const headers = {
            Authorization: `Basic ${authString}`
        };
        const response = await axios
            .get(
                'http://localhost:8080/api/user/login',
                {headers}
            );
        return response;
    }

    static async update(form, userId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = 'http://localhost:8080/api/user/update/'+userId;
        const response = await axios
            .patch(url, form, {headers});
        return response;
    }

    static async updatePwd(form, userId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = 'http://localhost:8080/api/user/update/pwd/'+userId;
        const response = await axios
            .patch(url, form, {headers});
        return response;
    }

    static async delete(userId){
        const headers = {
            Authorization: `Basic ${localStorage.getItem("auth")}`
        };
        const url = 'http://localhost:8080/api/user/delete/'+userId;
        const response = await axios
            .delete(url, {headers});
        return response;
    }

    static async getById(id){
        const response = await axios
            .get(`http://localhost:8080/api/user/id/${id}`);
        return response;
    }

    static async getAll(){
        const response = await axios
            .get(`http://localhost:8080/api/user`);
        return response;
    }
}