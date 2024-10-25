import React, {useState, useEffect} from 'react'
import "../../css/perfil_user.css"
import { Global } from '../../helpers/Global';
import { Link, useParams } from 'react-router-dom';
import { getPerfil } from '../../helpers/getPerfil';
import useAuth from '../../helpers/hooks/useAuth';

export const PerfilUser = () => {

  const [user, setUSer] = useState({});
  const {auth} = useAuth();
  const params = useParams();
  const [counters, setCounters] = useState({});

  useEffect(() => {

    getPerfil(params.userId, setUSer);
    getCounters();
  }, []);

  useEffect(() => {
    getPerfil(params.userId, setUSer);
    getCounters();
  }, [params]);

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
            <button className="btn btn-outline seguir-perfil">
              Seguir 
            </button> 
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
      jghjhgfdh
      djdjsk
      jsgjhd
      </div>
      
    </div>
  )
}
