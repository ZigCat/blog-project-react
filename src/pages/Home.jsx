import React, { Component } from 'react';
import "../styles/pages/home.scss";
import PostService from "../api/PostService";
import Loader from "../components/UI/Loader/Loader";
import PostForm from "../components/PostForm";
import PostRecord from "../components/PostRecord";
import ErrorItem from "../components/error/ErrorItem";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 1,
            isPostsLoading: true,
            posts: [],
            errorStatus: ""
        };
    }

    handleStatusError = (errorStatus) => {
        this.setState({errorStatus: errorStatus});
    }

    handleCategoryClick = (category) => {
        this.setState({category: category});
    }

    setPostLoading = (isPostsLoading) => {
        this.setState({isPostsLoading: isPostsLoading});
    }

    setPosts = (posts) => {
        this.setState({posts: posts});
    }

    fetchPosts = async () => {
        try{
            this.setPostLoading(true);
            const res = await PostService.getAll();
            this.setPosts(res.data.reverse());
        } catch (error) {
            this.handleStatusError(error.message);
        } finally {
            this.setPostLoading(false);
        }
    }

    componentDidMount() {
        this.fetchPosts();
        console.log(this.state.posts)
    }

    render() {
        return (
            <div className="homepage">
                <div className="homepage-inner">
                    <div className="homepage-top">
                        <div className="homepage-top-category" onClick={() => this.handleCategoryClick(1)}>
                            <h2>For you</h2>
                            <div className={"homepage-top-category-highlight " + (this.state.category === 1 ? "choose" : "")}></div>
                        </div>
                        <div className="homepage-top-category" onClick={() => this.handleCategoryClick(2)}>
                            <h2>Following</h2>
                            <div className={"homepage-top-category-highlight " + (this.state.category === 2 ? "choose" : "")}></div>
                        </div>
                    </div>
                    <div className="homepage-main">
                        <PostForm />
                        {this.state.isPostsLoading
                            ? <Loader/>
                            : this.state.errorStatus ? <ErrorItem message={this.state.errorStatus}/> :
                            this.state.errorStatus
                                ? <ErrorItem message={this.state.errorStatus}/>
                                : this.state.posts.map(post => <PostRecord post={post} key={post.id}/>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
