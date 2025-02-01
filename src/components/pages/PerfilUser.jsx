import React, {useState, useEffect} from 'react'
import "../../css/perfil_user.css"
import { Global } from '../../helpers/Global';
import { Link, useParams } from 'react-router-dom';
import { getPerfil } from '../../helpers/getPerfil';
import useAuth from '../../helpers/hooks/useAuth';
import { ArticulosPerfil } from './ArticulosPerfil';
import { guardarNotificacion } from '../../helpers/guardarNotificacion';
import { useGlobalContext } from '../../helpers/GlobalContext';
import CrearArticulo from './CrearArticulo';

export const PerfilUser = () => {
  const [btnCrear, setBtnCrear] = useState(false);
  const [user, setUser] = useState({});
  const {auth} = useAuth();
  const params = useParams();
  const [counters, setCounters] = useState({});
  const [articulos, setArticulos] = useState([]);
  const [iFollow, setiFollow] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);
  const { refreshKey } = useGlobalContext();

  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);

  const [cargando, setCargando] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getDataUser();
    getCounters();
    getArticulos(page);

  }, [params.id, refreshKey, page]);

  const getDataUser = async() => {
    
    try{
      
      let dataUser = await getPerfil(params.id, setUser);

      if(dataUser){
        setLoading(false);
        setCargando(false);
      }
      
      if(dataUser.following && dataUser.following._id ){
        setiFollow(true);
      }
    }
    catch(error){
      console.error("Error al cargar los datos del usuario:", error);
    }
    
  };

  const getCounters = async() => {

    const request = await fetch(Global.url + "usuario/counters/" + params.id, {
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

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  }

  const getArticulos = async(nextPage) => {

    setArticulos([]);
    
    const request = await fetch(Global.url + "articulos-usuario/" + params.id + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await request.json();

    if(data.status == "success"){

      let newArticulos = nextPage === 1 ? data.artUser.docs : [...articulos, ...data.artUser.docs];
      setArticulos(newArticulos);

      // Paginacion - condición no mostrar btn ver más
      if(!data.artUser.nextPage){
        setMore(false);
      }
    }
  }

  const seguirUsuario = async(userId) => {
    
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
      guardarNotificacion(auth._id, userId); // seguidor, user_seguido
    }
  }

  const unfollowUsuario = async(userId) => {

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

  const confirmEliminar = async () => {

    const request = await fetch (Global.url + "articulo/" + idEliminar, {
      method: "DELETE",
      headers: {
        "Context-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });

    let datos = await request.json();
    
    if(datos.status === "success"){
      // guardamos en una lista todos los articulos que no sean el del id eliminado
      let articulosActualizados = articulos.filter(articulo => articulo._id !== idEliminar);
      setArticulos(articulosActualizados); // actualizamos el estado de articulos

      // conseguirArticulos(1);
      setModConfirm(false); // cerramos el modal
    }
  
  }

  const avatarDefault = "../../../public/default-avatar-profile-icon-of-social-media-user-vector.jpg";
  const headerDefault = "../../../public/header.jpg";

  let urlImagen = user.image === "default.png" ? 
    avatarDefault : Global.url + "usuario/avatar/" + user.image;

    if (loading) {
      return (
        <div className="page-cargando">
          <h1 className='cerrar-texto'>Cargando</h1>
          <span className="loader-out" />
        </div>
      );
    }

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
        {cargando ? (
          <div className="page-cargando">
            <h1 className='cerrar-texto'>Cargando</h1>
            <span className="loader-out" />
          </div>
        ) 
        :(
          articulos.length >= 1 ? (
            <>
            {articulos.map(articulo => (

              <ArticulosPerfil 
                key={articulo._id} articulo={articulo} 
                setArticulos={setArticulos} user={user}
                seguirUsuario={seguirUsuario} 
                unfollowUsuario={unfollowUsuario}
                iFollow={iFollow} setIdEliminar={setIdEliminar} 
                confirmEliminar={confirmEliminar}
              />
            ))}

            {more &&
              <button className="btn flex" style={{margin: "0 auto"}} onClick={nextPage} >
                Ver más
              </button> 
            }
            </>
          )
          :(
            <h1 className='flex justify-center'>
              No hay articulos
            </h1>
          )
        )}
      
      </div>
      
      
      <button onClick={() =>  setBtnCrear(true)} className='btn btn-crear btn-save'>
        Crear articulo
      </button>

      {btnCrear && <CrearArticulo setBtnCrear={setBtnCrear} />}
    </div>
  )
}
