import React, { useEffect, useState } from 'react';
import "../../css/explorar_users.css";
import { Global } from '../../helpers/Global';
import { UserList } from './UserList';

export const ExplorarUsers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const [following, setFollowing] = useState([]);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        conseguirUsers();
    }, []);
 
    const conseguirUsers = async(nextPage) => {

        setLoading(true);

        const request = await fetch(Global.url + "usuario/list/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if(data.status == "success" && data.users){
            
            let newUsers = data.users;

            if(users.length >= 1){
                newUsers = [...users, ...data.users];
            }

            setUsers(newUsers);
            setLoading(false);
            setFollowing(data.user_following);

            // Paginacion - condición no mostrar btn ver más
            if(!(data.pages - data.page) >= 1){
                setMore(false);
            }
        }
    }
    
  return (
    <div className='page-users'>
        
        <div className='content-users'> 

            <UserList 
                users={users} conseguirUsers={conseguirUsers}
                following={following} setFollowing={setFollowing}
                more={more} loading={loading} page={page} setPage={setPage}
            />
        
        </div>
    </div>
  )
}
