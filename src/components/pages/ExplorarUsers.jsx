import React, { useEffect, useState } from 'react';
import "../../css/explorar_users.css";
import useAuth from '../../helpers/hooks/useAuth';
import { Global } from '../../helpers/Global';
import { PeticionAjax } from '../../helpers/PeticionAjax';

export const ExplorarUsers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const {auth} = useAuth();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        conseguirUsers();
    }, []);

    const conseguirUsers = async() => {

        const request = await fetch(Global.url + "usuario/list/1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        console.log(data.user_following);

        if(data.status == "success" && data.users){
            setUsers(data.users);

            setFollowing(data.user_following);
        }
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

            {users.map(user => {

                let urlImagen = user.image === "default.png" ? 
                avatarDefault : Global.url + "usuario/avatar/" + user.image;

                return(

                <div key={user._id} className='row-user'>

                    <div className='pfp-user'>
                        <img src={urlImagen} alt="foto de perfil" />
                    </div>

                    <div className="info-user">

                        <p className="name-user"> {user.name} {auth.surname} </p>

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

        </div>
    </div>
  )
}
