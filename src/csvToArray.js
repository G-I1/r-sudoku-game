const csvToArray = (file,delimiter=",")=>{

    const headers = file.slice(0,file.indexOf('\n')).split(delimiter);
    const rows = file.slice(file.indexOf('\n')+1).split('\n');

    const arr = rows.map(row=>{
      const values = row.split(delimiter);
      const el = headers.reduce((obj,header,index)=>{
        obj[header] = values[index];
        return obj;
      },{})
      return el;
    })
    return arr; 
  }

  export default csvToArray ;