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
        console.log("run once please")
        const getUsers = async () => {
            try {
            //     const response = await axiosPrivate.get('/users', {
            //         signal: controller.signal
            //     });
            //     console.log(response.data);
            //     isMounted && setUsers(response.data);
            // }
                let result = await fetch(
                ('/.netlify/functions/get_users'), {})
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    let users=["paco"];
                    let info = JSON.parse(data)
                    let username = info.username;
                    users.push(username);
                    console.log(username)
                    isMounted && setUsers(users);
                })



            } catch (err) {
                console.log(err);
                // navigate('/login', { state: { from: location }, replace: true });
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