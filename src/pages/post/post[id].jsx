import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../../api/PostService";
import CommentService from "../../api/CommentService";
import Loader from "../../components/UI/Loader/Loader";
import PostItem from "../../components/PostItem";
import UserService from "../../api/UserService";
import "../../styles/pages/postpage.scss";
import CommentForm from "../../components/CommentForm";
import CommentRecord from "../../components/CommentRecord";
import ErrorItem from "../../components/error/ErrorItem";

const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [sessionUser, setSessionUser] = useState({});
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState("");

    const fetchData = async (id) => {
        try {
            setIsDataLoading(true);
            const postData = await PostService.getById(id);
            const commentsData = await CommentService.getByPostId(id);
            const sesUser = await UserService.getById(localStorage.getItem("id"));
            setPost(postData.data);
            setComments(commentsData.data);
            setSessionUser(sesUser.data);
        } catch (error) {
            setErrorStatus(error.message);
        } finally {
            setIsDataLoading(false);
        }
    };

    useEffect(() => {
        fetchData(params.id);
        console.log(post);
    }, []);

    return (
        <div className="postpage">
        {isDataLoading
        ? <Loader />
        : errorStatus
                ? <ErrorItem message={errorStatus}/>
                :
                <div className="postpage-inner">
                    <div className="postpage-post">
                        <PostItem post={post} sessionUser={sessionUser}/>
                    </div>
                    <div className="postpage-comments">
                        <div className="postpage-comments-title">
                            <h3>Комментарии</h3>
                        </div>
                        <div className="postpage-comments-body">
                            <CommentForm post={post}/>
                            <div className="postpage-comments-body-items">
                                {comments.map((item) => <CommentRecord key={item.id} comment={item} sessionUser={sessionUser}/>)}
                            </div>
                        </div>
                    </div>
                </div>
        }
        </div>
    );
};

export default PostPage;