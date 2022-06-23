export const getDatafromLS=()=>{
    const data = localStorage.getItem('contacto');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
}