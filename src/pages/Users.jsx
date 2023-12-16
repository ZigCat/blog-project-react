import React, {useEffect, useState} from 'react';
import "../styles/pages/users.scss";
import UserService from "../api/UserService";
import Loader from "../components/UI/Loader/Loader";
import UserRecord from "../components/UserRecord";

function Users(props) {
    const [users, setUsers] = useState({});
    const [isDataLoading, setIsDataLoading] = useState(true);

    const fetchData = async () => {
        setIsDataLoading(true);
        const usersRes = await UserService.getAll();
        if(usersRes.status === 200){
            setUsers(usersRes.data);
        }
        setIsDataLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="users">
            <div className="users-inner">
                {isDataLoading
                    ? <Loader />
                    : users.map((user) => <UserRecord key={user.id} user={user}/>)
                }
            </div>
        </div>
    );
}

export default Users;