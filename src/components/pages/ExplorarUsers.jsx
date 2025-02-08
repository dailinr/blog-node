import React, { useEffect, useState } from 'react';
import "../../css/explorar_users.css";
import { Global } from '../../helpers/Global';
import { UserList } from './UserList';
import { useGlobalContext } from '../../helpers/GlobalContext';
import CrearArticulo from './CrearArticulo';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ExplorarUsers = () => {
    const token = localStorage.getItem("token");

    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [btnCrear, setBtnCrear] = useState(false);

    const { refreshKey } = useGlobalContext();

    useEffect(() => {
        conseguirUsers();
    }, []);

    useEffect(() => {
        conseguirUsers();
      }, [refreshKey]);
 
    const conseguirUsers = async(nextPage) => {

        setLoading(true);
        setUsers([]);

        const request = await fetch(BACKEND_URL + "usuario/list/" + nextPage, {
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

        <button onClick={() =>  setBtnCrear(true)} className='btn btn-crear btn-save'>
            Crear articulo
        </button>

        {btnCrear && <CrearArticulo setBtnCrear={setBtnCrear} />}
    </div>
  )
}
