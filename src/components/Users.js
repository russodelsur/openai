import { useState, useEffect } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                let result = await fetch(
                ('/.netlify/functions/get_users'), {})
                .then(response => response.text())
                .then(data => {
                    let users=["paco"];
                    let info = JSON.parse(data)
                    let username = info.username;
                    users.push(username);
                    isMounted && setUsers(users);
                })



            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            {/* <button onClick={() => getUsers()}></button> */}
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.users}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;