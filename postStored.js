const addToDb=(info)=>{
    let infoList=[];
    const storage=JSON.parse(localStorage.getItem("Info"));
    if(storage){
        infoList=storage
    }
    infoList.push(info)
    localStorage.setItem("Info",JSON.stringify(infoList))
}

const removeHistory=()=>{
    localStorage.removeItem("Info");
}

export {
    addToDb,
    removeHistory
}