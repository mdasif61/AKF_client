import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from './hooks/useAxiosSecure';
import { mainContext } from './NavPage/AuthProvider';
import useMyBlog from './hooks/useMyBlog';


const postImage = import.meta.env.VITE_IMAGE_UPLOAD_KEY

const Modal = ({ handleClose, data }) => {

  const [axiosSecure]=useAxiosSecure()
  const closeRef=useRef(null);
  const {user}=useContext(mainContext)
  const {refetch}=useMyBlog()

  const fileInputRef = useRef(null);
  const {handleSubmit, register, setValue}=useForm()

  const mutation=useMutation(async(data)=>{
    return await axiosSecure.post('/all-post', data)
    .then(res=>res.data)
  },{
    onSuccess:(data)=>{
      console.log(data)
      if(data.insertedId){
        closeRef.current.close()
        refetch()
      }
    }
  },{
    onError:(error)=>{
      console.log(error)
    }
  })

  const onSubmit=(data)=>{
    const imageHostinUrl=`https://api.imgbb.com/1/upload?key=${postImage}`

    const formData=new FormData();
    formData.append('image', data.photo[0])

    fetch(imageHostinUrl, {
      method:'POST',
      body:formData
    })
    .then(res=>res.json())
    .then((imageData)=>{
      if(imageData.success){
        const imageUrl=imageData.data.display_url;
        const {status}=data;
        const blogData={text:status, photo:imageUrl, like:0, status:'Pending', email:user.email}
        mutation.mutate(blogData)
      }
    })

  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleChange = (event) => {
    setValue('photo', event.target.files)
  }

  const handleFileButton = (event) => {
    event.stopPropagation();
  }

  return (
    <div onClick={handleClose} className='w-full z-50 min-h-screen bg-zinc-400 fixed top-0 left-0 bg-opacity-40 flex items-center justify-center'>
      <dialog ref={closeRef} open onClick={handleFileButton} className='w-5/12 p-5 rounded-xl'>

        <button onClick={handleClose} className='btn btn-circle btn-sm text-xl bg-red-600 border-none absolute right-2 top-2'><FontAwesomeIcon icon={faXmark} /></button>

        <div className='border-b-2 py-2 text-xl mb-5'>
          <h1 className='text-center font-bold text-gray-600'>Create Blog</h1>
        </div>

        <div className='flex items-center'>
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={data?.image} alt="" />
            </div>
          </div>
          <div className='flex-1 ml-4'>
            <h3>{data?.name}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='my-5'>
            <textarea {...register('status')} className='w-full resize-none border-none outline-none' placeholder='Write your blog' id="" rows="5"></textarea>
          </div>


          <div className='border-green-200 text-green-600 border my-5 flex items-center px-4 rounded-lg'>
            <FontAwesomeIcon onClick={handleClick} className='text-xl mr-2 cursor-pointer text-green-500 py-2' icon={faImage} /> Add Photo
            <input {...register('photo')} className='hidden' onChange={handleChange} ref={fileInputRef} type="file" id="" />
          </div>

          <button type='submit' className='btn btn-block bg-black'>Post</button>
        </form>

      </dialog>
    </div>
  );
};

export default Modal;