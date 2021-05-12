export default class CrudService {
  constructor(){
    this._apiBase = 'http://178.128.196.163:3000/api/records';
  }

  // GET
  getResources = async () => {
    const res = await fetch(this._apiBase);
    if(!res.ok){throw new Error(`${res.status}`)}
    return await res.json().then(data => data.map(this._transformJSON));
 }

 // DELETE
 deleteResources = async (id) => {
   const res = await fetch(`${this._apiBase}/${id}`, {
        method: 'DELETE'
      });
   if(!res.ok){throw new Error(`${res.status}`)}
   return await res.json();
 }

 // POST
 updateResources = async (id, body) => {
   const res = await fetch(`${this._apiBase}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(body)
      });
   if(!res.ok){throw new Error(`${res.status}`)}
   return await res.json();
 }

 // PUT
 postResources = async (body) => {
   const res = await fetch(this._apiBase, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(body)
    });
    if(!res.ok){throw new Error(`${res.status}`)}
    return await res.json();
 }

 // Проверка данных
 _isSet = (data) => {
   if(data){
     return data;
   }else{
     return 'Unknown';
   }
 }

// Преобразование данных
 _transformJSON = (data) => {
   if(!data.data ){
     return {
        _id: data._id,
        data: {
              name: 'Неверный формат на сервере',
              age: 'Неверный формат на сервере'
              }
            }
   }

     return {
          _id: data._id,
          data: {
                name: this._isSet(data.data.name),
                age: this._isSet(data.data.age)
                }
            }
 }

}
