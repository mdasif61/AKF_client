import React from "react";

const CustomModal = ({ data, setDeleteCon, modalDeletePost, blog }) => {
  return (
    <div className="fixed top-0 left-0 bg-zinc-400 w-full h-screen bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-auto overflow-hidden rounded-xl">
        <div className="p-5 text-center">
          <h1 className="text-lg font-bold mb-2">{data.header}</h1>
          <h3>{data.title}</h3>
        </div>
        <div className="flex justify-evenly p-2 bg-gray-200">
          <button onClick={()=>modalDeletePost(blog)} className="btn bg-red-500 btn-sm hover:bg-red-600 border-none m-2">
            Delete
          </button>
          <button onClick={()=>setDeleteCon(false)} className="btn btn-sm border border-red-500 bg-transparent hover:bg-transparent hover:border-red-500 text-red-600 m-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
