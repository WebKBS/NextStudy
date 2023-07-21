import './App.css';
import Backdrop from './components/Backdrop';
import Modal from './components/Modal';
import Todo from './components/Todo';

function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <Todo title="Hello1" />
      <Todo title="Hello2" />
      <Todo title="Hello3" />
      {/* <Modal />
      <Backdrop /> */}
    </div>
  );
}

export default App;
