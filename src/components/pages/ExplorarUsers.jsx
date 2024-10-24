import React, { useEffect, useState } from 'react';
import "../../css/explorar_users.css";
import useAuth from '../../helpers/hooks/useAuth';
import { Global } from '../../helpers/Global';

export const ExplorarUsers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const [following, setFollowing] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [loading, setLoading] = useState(true);

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

    const nextPage = () => {
        let next = page + 1;
        setPage(next);

        conseguirUsers(next);

        console.log(page, users);
    }
    
    const seguirUsuario = async(userId) => {
        console.log("seguir el usuario " + userId);
        
        const request = await fetch( Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({followed: userId}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if(data.status == "success"){
            
            // Actualizar estado de following, agregando el nuevo follow
            setFollowing([...following, userId]);
        }
    }

    const unfollowUsuario = async(userId) => {
        console.log("dejar de seguir el usuario " + userId);

        const request = await fetch( Global.url + "follow/unfollow/" + userId,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        if(data.status == "success"){

            // filtrar los datos para eliminar el serId al q se dio unfollow
            let filterFollowings = following.filter(followingUserId => userId !== followingUserId);
            setFollowing(filterFollowings);
        }
    } 

    const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
   
  return (
    <div className='page-users'>
        
        <div className='content-users'>
        
        {!loading ? (
            <>

            {users.map(user => {

                let urlImagen = user.image === "default.png" ? 
                avatarDefault : Global.url + "usuario/avatar/" + user.image;

                return(

                <div key={user._id} className='row-user'>

                    <div className='pfp-user'>
                        <img src={urlImagen} alt="foto de perfil" />
                    </div>

                    <div className="info-user">

                        <p className="name-user"> {user.name} {user.surname} </p>

                        <p className="nick-user"> @{user.nick} </p>

                        <p className="bio-user"> {user.bio} </p>

                    </div>

                    {following.includes(user._id) ? 
                        <button onClick={() => unfollowUsuario(user._id)} className="btn btn-neutral">
                            Siguiendo
                        </button>
                    :
                        <button onClick={() => seguirUsuario(user._id)} className="btn btn-outline">
                            Seguir
                        </button>
                    }
   
                    <i className='bx bx-dots-vertical-rounded icon-opt'  />
                    
                </div>
                );
            })}
            
            {more &&
                <button className="btn flex" style={{margin: "0 auto"}} onClick={nextPage} >
                    Ver más
                </button> 
            }
            </>
        ):
            <div className="page-cargando">
                <h1 className='cerrar-texto'>Cargando</h1>
                <span className="loader-out" />
            </div>
        }

        </div>
    </div>
  )
}
