import React, {useEffect, useMemo, useState} from 'react';
import "../styles/pages/explore.scss";
import Input from "../components/UI/Input/Input";
import Loader from "../components/UI/Loader/Loader";
import UserService from "../api/UserService";
import ErrorItem from "../components/error/ErrorItem";
import Select from "../components/UI/Select/Select";
import UserRecord from "../components/UserRecord";

const Explore = () => {
    const [search, setSearch] = useState("");
    const [selectedSearch, setSelectedSearch] = useState("username");
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState("");
    const [users, setUsers] = useState([]);

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => a[selectedSearch].localeCompare(b[selectedSearch]));
    }, [selectedSearch, users]);

    const sortedSearchedUsers = useMemo(() => {
        return sortedUsers.filter(user => user[selectedSearch].includes(search));
    }, [search, users])

    const fetchData = async () => {
        try{
            setIsDataLoading(true);
            const usersRes = await UserService.getAll();
            setUsers(usersRes.data);
        } catch (error){
            setErrorStatus(error.message);
        } finally {
            setIsDataLoading(false);
        }
    }

    const sortPosts = (sort) => {
        setSelectedSearch(sort);
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="explore">
            <div className="explore-inner">
                <div className="explore-head">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Поиск..."
                    />
                    <Select
                        value={selectedSearch}
                        onChange={(e) => sortPosts(e.target.value)}
                        options={[
                            {value: "username", name: "По имени пользователя"},
                            {value: "nickname", name: "По никнейму"}
                        ]}
                    />
                </div>
                <div className="explore-body">
                    {isDataLoading
                        ? <Loader />
                        : errorStatus ? <ErrorItem message={errorStatus}/> :
                            search && sortedSearchedUsers.map(user => <UserRecord user={user} key={user.id}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Explore;