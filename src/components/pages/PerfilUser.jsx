import React, {useState, useEffect} from 'react'
import "../../css/perfil_user.css"
import { Global } from '../../helpers/Global';
import { Link, useParams } from 'react-router-dom';
import { getPerfil } from '../../helpers/getPerfil';
import useAuth from '../../helpers/hooks/useAuth';
import { ArticulosPerfil } from './ArticulosPerfil';

export const PerfilUser = () => {

  const [user, setUser] = useState({});
  const {auth} = useAuth();
  const params = useParams();
  const [counters, setCounters] = useState({});
  const [articulos, setArticulos] = useState([]);
  const [iFollow, setiFollow] = useState(false);

  useEffect(() => {

    getDataUser();
    getCounters();
    getArticulos();

  }, []);

  useEffect(() => {
    
    getDataUser();
    getCounters();
    getArticulos();

  }, [params]);

  const getDataUser = async() => {
    

    let dataUser = await getPerfil(params.userId, setUser);
    // console.log(dataUser);
    if(dataUser.following && dataUser.following._id ){
      setiFollow(true);
    }
  }

  const getCounters = async() => {

    const request = await fetch(Global.url + "usuario/counters/" + params.userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.following){
      setCounters(data);
    }
  }

  const getArticulos = async(nextPage = 1) => {
    
    const request = await fetch(Global.url + "articulos-usuario/" + params.userId + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.status == "success"){
      setArticulos(data.artUser.docs);
    }

  }

  const seguirUsuario = async(userId) => {
    // console.log("seguir el usuario " + userId);
    
    const request = await fetch( Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({followed: userId}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.status == "success"){
        
      // Actualizar estado de following, agregando el nuevo follow
      setiFollow(true);
    }
}

const unfollowUsuario = async(userId) => {
    // console.log("dejar de seguir el usuario " + userId);

    const request = await fetch( Global.url + "follow/unfollow/" + userId,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.status == "success"){
      setiFollow(false);
    }
} 

  const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  const headerDefault = "../../../public/header.jpg";

  let urlImagen = user.image === "default.png" ? 
    avatarDefault : Global.url + "usuario/avatar/" + user.image;

  return (
    <div className=' page-perfil'>
      
      <div className='info-perfil'>

        <div className='header-perfil'
          style={{ background: `url(${headerDefault}) no-repeat center / cover` }}>

          <div className='avatar-perfil'
            style={{ background: `url(${urlImagen}) no-repeat center / cover` }}>

          </div>

          {user._id == auth._id ? 

            <Link to={"/configuracion"} className='editar-perfil' >
              Editar perfil
            </Link>
          :
            
            (!iFollow ?
              <button onClick={() => seguirUsuario(user._id)} className=" seguir-perfil btn btn-outline">
                Seguir
              </button>
            :
              <button onClick={() => unfollowUsuario(user._id)} className=" seguir-perfil btn btn-neutral">
                Siguiendo
              </button>
            )
          }

        </div>

        <div className='data-user'>

          <h2 className='nombre-user'>{user.name} {user.surname}</h2>
          <p className='nick-user'>@{user.nick}</p>

        </div> 
      
        <div className='follow-counters'>
          
          <div className='following'>
            {counters.following >= 1 ? counters.following : 0}  
            <span><Link to={"/siguiendo/" + user._id}> Siguiendo</Link> </span>
          </div>

          <div className='followers'>
            {counters.followed >= 1 ? counters.followed : 0} 
            <span><Link to={"/seguidores/" + user._id}> Seguidores</Link> </span>
          </div>

          <div className='articulos'>
            {counters.articulos >= 1 ? counters.articulos : 0} 
            <span>Articulos</span> 
          </div>
        </div>
      </div>

      <div className='post-perfil'>
        {articulos.map(articulo => {

          return(
            <ArticulosPerfil 
              key={articulo._id}
              articulo={articulo}
              user={user}
            />
          )

        })} 
      
      </div>
      
    </div>
  )
}
