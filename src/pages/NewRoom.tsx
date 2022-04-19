import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import illustrationImg from "../assets/images/illustration.svg";
import logoutImg from "../assets/images/logout.svg"
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss"
import "../styles/global.scss"
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { auth, database } from '../services/firebase';
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';


export function NewRoom() {

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref("rooms")
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorID: user?.id
    })
    history.push(`/rooms/${firebaseRoom.key}`)
  }
  
  function logout(){
    auth.signOut()
    history.push('/')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração indicando perguntas e respostas" />
        <strong>Crie suas salas de Q&A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="profile">        
           <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img src={user?.avatar} alt={user?.name} />
            <span>{user?.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={logout} > <img src={logoutImg} alt="imagem de logout" /> Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existênte ? <Link to="/">Clique Aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
