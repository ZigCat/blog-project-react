import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "../../styles/pages/userpage.scss";
import UserItem from "../../components/UserItem";
import Loader from "../../components/UI/Loader/Loader";
import UserService from "../../api/UserService";
import PostService from "../../api/PostService";
import PostRecord from "../../components/PostRecord";
import UserForm from "../../components/UserForm";
import ErrorItem from "../../components/error/ErrorItem";

const UserPage = () => {
    const params = useParams();
    const [user, setUser] = useState({});
    const [sessionUser, setSessionUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState("");

    const fetchUsers = async (id) => {
        try{
            setIsDataLoading(true);
            const sesUser = await UserService.getById(localStorage.getItem("id"));
            const userRes = await UserService.getById(id);
            setUser(userRes.data);
            setSessionUser(sesUser.data);
        } catch (error){
            setErrorStatus(error.message);
        } finally {
            setIsDataLoading(false);
        }
    }

    const fetchData = async (id) => {
        try{
            setIsDataLoading(true);
            const postsRes = await PostService.getByUser(id);
            setPosts(postsRes.data.reverse());
        } catch (error){
            setErrorStatus(error.message);
        } finally {
            setIsDataLoading(false);
        }
    }

    const handleIsEdit = () => {
        setIsEdit(!isEdit);
    }

    useEffect(() => {
        if(localStorage.getItem("id")){
            fetchUsers(params.id);
        }
    }, [params]);

    useEffect(() => {
        if(localStorage.getItem("id")){
            fetchData(params.id);
        }
    }, [params, user]);

    return (
        <div className="userpage">
            {isDataLoading
                ? <Loader />
                : errorStatus ? <ErrorItem message={errorStatus}/> :
                <div className="userpage-inner">
                    {isEdit
                        ? <UserForm user={user} setUser={setUser} sessionUser={sessionUser} setIsEdit={handleIsEdit}/>
                        : <UserItem user={user} sessionUser={sessionUser} setIsEdit={handleIsEdit}/>
                    }
                    <div className="userpage-posts">
                        <div className="userpage-posts-title">
                            <h3>Посты пользователя</h3>
                        </div>
                        {posts.map((post) => (
                            <PostRecord key={post.id} post={post}/>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default UserPage;