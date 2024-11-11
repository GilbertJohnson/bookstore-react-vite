import { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const backendurl = import.meta.env.VITE_BACKEND_API;

const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  const handleDelete = ()=>{
    setLoading(true);
    axios.delete(backendurl+`books/${id}`).then(()=>{
      setLoading(false);
      enqueueSnackbar(`Book Deleted successfully!`,{variant:'success'})
      navigate('/')
    })
    .catch((err)=>{
      setLoading(false)
      enqueueSnackbar(`Error deleting book!`,{variant:'error'})
      console.log(err.message)
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete book</h1>
      {loading?<Spinner/>:''}
      <div className='flex flex-xol items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure want to delete this book</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>
          Yes
        </button>
      </div>
        
    </div>
  )
}

export default DeleteBook