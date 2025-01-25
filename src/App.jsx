import Navbar from "./components/Navbar"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <div className="overflow-x-hidden pt-10"><Navbar/></div>
    </>
  )
}

export default App
