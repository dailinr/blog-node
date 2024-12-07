import React, { useEffect, useState } from 'react';
import "../../css/explorar_users.css";
import { Global } from '../../helpers/Global';
import { UserList } from './UserList';
import { useParams } from 'react-router-dom';
import { getPerfil } from '../../helpers/getPerfil';
import CrearArticulo from './CrearArticulo';

export const Following = () => {
    const [btnCrear, setBtnCrear] = useState(false);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const [following, setFollowing] = useState([]);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [userPerfil, setUserPerfil] = useState({});

    const params = useParams();

    useEffect(() => {
        conseguirUsers();
        getPerfil(params.userId, setUserPerfil);
    }, []);
 
    const conseguirUsers = async(nextPage) => {

        setLoading(true);

        // sacar userId de la url
        const userId = params.userId;

        const request = await fetch(Global.url + "follow/following/" + userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();
        
        let cleanUsers = [];
        // Recorrer y limpiar siguiendo para obtener cada followed
        data.siguiendo.forEach(siguiendo => {
            cleanUsers = [... cleanUsers, siguiendo.followed]
        });
        data.users = cleanUsers;

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

            <h2>Usuarios que sigue {userPerfil.name} {userPerfil.surname} </h2>

            <UserList users={users} conseguirUsers={conseguirUsers}
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
