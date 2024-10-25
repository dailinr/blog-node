import React from 'react';
import "../../css/explorar_users.css";
import { Global } from '../../helpers/Global';
import useAuth from '../../helpers/hooks/useAuth';

export const UserList = ({users, conseguirUsers, following,
    setFollowing, more, loading, page, setPage}) => {
    
    const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
    const token = localStorage.getItem("token");
    const {auth} = useAuth();

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

  return (

    !loading ? (
        <>  

        {users.map(user => (
        
            user._id != auth._id && (

                <div key={user._id} className='row-user'>

                    <div className='pfp-user'>
                        <img src={user.image === "default.png" ? avatarDefault : Global.url + "usuario/avatar/" + user.image}  alt="foto de perfil" />
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

                    {/* <i className='bx bx-dots-vertical-rounded icon-opt'  /> */}
                    
                </div>
            )
        ))}
        
        {more &&
            <button className="btn flex" style={{margin: "0 auto"}} onClick={nextPage} >
                Ver más
            </button> 
        }

        </>
    ) 
    :(
        <div className="page-cargando">
            <h1 className='cerrar-texto'>Cargando</h1>
            <span className="loader-out" />
        </div>
    )
  )
}
