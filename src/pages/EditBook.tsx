import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/spinner';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

const backendurl = import.meta.env.VITE_BACKEND_API;

const EditBook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios.get(backendurl+`books/${id}`).then((res)=>{
      setAuthor(res.data.book.author)
      setPublishYear(res.data.book.publishYear)
      setTitle(res.data.book.title)
      setLoading(false);
    })
    .catch((err)=>{
      setLoading(false);
      console.log(err.message);
    })
  },[])
  const handleSaveBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    }
    setLoading(true);
    axios.put(backendurl+`books/${id}`,data).then(()=>{
      setLoading(false);
      enqueueSnackbar(`Book edited successfully!`,{variant:'success'})
      navigate('/')
    })
    .catch((err)=>{
      setLoading(false);
      enqueueSnackbar(`Error editing the book!`,{variant:'error'})
      console.log(err.message)
    })
  }
  
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit existing book</h1>
      {loading ? <Spinner/>: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl sm:w-[80%] lg:w-[60%] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="number" value={publishYear} onChange={(e)=>{setPublishYear(e.target.value)}} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook} >
            Save
        </button>
      </div>
    </div>
  )
}

export default EditBook