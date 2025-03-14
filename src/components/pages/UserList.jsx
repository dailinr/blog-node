import React from 'react';
import "../../css/explorar_users.css";
 ;
import useAuth from '../../helpers/hooks/useAuth';
import { Link, useParams} from 'react-router-dom';
import { guardarNotificacion } from '../../helpers/guardarNotificacion';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const UserList = ({users, conseguirUsers, following, 
    setFollowing, more, loading, page, setPage}) => {
    
    const avatarDefault = `${import.meta.env.BASE_URL}default-avatar-profile-icon-of-social-media-user-vector.jpg`;
    const token = localStorage.getItem("token");
    const {auth} = useAuth();
    const params = useParams();

    const nextPage = () => {
        let next = page + 1;
        setPage(next);

        conseguirUsers(next);
    }

    const seguirUsuario = async(userId) => {
        
        const request = await fetch( BACKEND_URL + "follow/save", {
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
            guardarNotificacion(auth._id, userId);
        }
    }

    const unfollowUsuario = async(userId) => {

        const request = await fetch( BACKEND_URL + "follow/unfollow/" + userId,{
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

  return (

    !loading ? ( <> 

        {users.map(user => (
        
            user && user._id &&  ( 
                // !params.id ? ( user._id != auth._id && (
                
                <div key={user._id} className='row-user'>

                    <div className='pfp-user'>
                        <img src={user.image === "default.png" ? avatarDefault : BACKEND_URL + "usuario/avatar/" + user._id}  alt="foto de perfil" />
                    </div>

                    <div className="info-user">

                        <Link to={"/perfil/"+ user._id} className="name-user"> 
                            {user.name} {user.surname} 
                        </Link>

                        <p className="nick-user"> @{user.nick} </p>

                        <p className="bio-user"> {user.bio} </p>

                    </div>
                    
                    {user._id != auth._id &&
                        (following.includes(user._id)? 
                            <button onClick={() => unfollowUsuario(user._id)} className="btn btn-neutral">
                                Siguiendo
                            </button>
                        :
                            <button onClick={() => seguirUsuario(user._id)} className="btn btn-outline">
                                Seguir
                            </button>
                        )
                    }   

                    {/* <i className='bx bx-dots-vertical-rounded icon-opt'  /> */}
                    
                </div>
            ) 
        ))}
        
        {more &&
            <button className="btn flex" style={{margin: "0 auto"}} onClick={nextPage} >
                Ver más
            </button> 
        }        
    </> ) 
    :(
        <div className="page-cargando">
            <h1 className='cerrar-texto'>Cargando</h1>
            <span className="loader-out" />
        </div>
    )
  )
}
