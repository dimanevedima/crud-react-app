import React, {Component} from 'react';
import CrudService from '../../services/crudService';


import './user-table.css';
import { Table, Button} from 'reactstrap';

import UserModal from '../user-modal';
import UserForm from '../user-form';
import UserTableItem from '../user-table-item';
import Spinner from '../spinner';

//import data from './db.json';

export default class UserTable extends Component{

  jsonApi = new CrudService();

    state = {
      name: '' ,
      age: '',
      disabled: true,
      dataApi: null,
      updateItem: null
    };

    // Функция для работы с формой, обновляющей имя
    updateName = (e) => {
      this.setState({
        name: e.target.value
      })
    };
    // Функция для работы с формой, обновляющей возраст
    updateAge = (e) => {
      this.setState({
        age: e.target.value
      })
    };

    // Обработка события Submit функции формы
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state.name);
        //console.log(this.state.age);
        const {name, age} = this.state;
        if(!age || !name){
          alert('Обнаружены пустые поля!');
          return
        }
        const newData = {
          data: {
            name: name,
            age: age
          }
        }
        //console.log(newData);
        this.jsonApi.postResources(newData).then(this.updateData);
        //this.jsonApi.postResources(newData).then(data => console.log(data));
        this.showModal();
    };


    loginModalRef = ({toggle}) => { //Для Модального окна
      this.showModal = toggle;
    };

    onAddDataClick = () => {   // Для кнопки
      this.showModal();
    };

  // Работа с таблицей

  updateState = (dataApi) => {
    this.setState({
      dataApi
    })
    //console.log(this.state.dataApi)
  };

  updateData = () => {
    //this.jsonApi.getResources().then(data => console.log(data));
      this.jsonApi.getResources().then(this.updateState);
  };

  componentDidMount () {
      this.updateData();
      console.log('didMOunt');
  };


  renderTableItemsApi = (arr) => {
         return arr.map(({_id, data}, index) => {
        //  console.log(_id);
           return   (
              <UserTableItem
                key = {_id}
                _id={_id}
                data = {data}
                index = {index}
                editName = {(e) => this.editApi(e, _id, 'name')}
                editAge = {(e) => this.editApi(e, _id, 'age')}
                onUpdate = {(e) => this.onUpdate(e, _id)}
                onDelete = {() => this.onDelete(_id) }
                />
              )
         });
    };

    // Изменение записи
    onUpdate = (e, id) => {
      //console.log(id);
      //console.log(e.target.getAttribute('type'));
      //  console.log(document.querySelectorAll('input'));
      //  console.log(document.querySelectorAll(`tr[data-key = '${id}'] input`));
      const inputs = document.querySelectorAll(`tr[data-key = '${id}'] input`);
      inputs.forEach(item => {
        //console.log(this.state.disabled);
        if (this.state.disabled) {
            item.removeAttribute('disabled');
        }else{
          item.setAttribute('disabled' , `${this.state.disabled}`);
        }
      });

      const button = document.querySelector(`tr[data-key = '${id}'] button`);
      //console.log(button);
      button.textContent = this.state.disabled ? 'Сохранить' : 'Изменить'  ;
      if(!this.state.disabled && this.state.updateItem){
        alert('Saved!');
        const updateItem = this.state.updateItem;
        //console.log(updateItem);
        const body  = {
          data: {
                name: updateItem.data.name,
                age: updateItem.data.age
               }
        }
        // console.log(body);
        // this.jsonApi.updateResources(id, body).then(data => console.log(data));
        this.jsonApi.updateResources(id, body).then(this.updateData);
        this.setState({
            updateItem: null
          });
      }
      const buttons = document.querySelectorAll('button.update');
      // console.log(buttons);
      buttons.forEach((item) => {
        if (item !== button) {
          item.setAttribute('disabled', true);
        }
      });

      this.setState({
       disabled: !this.state.disabled
     });

      buttons.forEach((item) => {
        if (item !== button && !this.state.disabled) {
            item.removeAttribute('disabled');
          }
        });
  };

  // Удаление записи
  onDelete = (id) => {
    //console.log(id);
    document.querySelectorAll('button.update')
    .forEach((item) => {
        item.removeAttribute('disabled');
    });
  //  console.log(id);
  //  this.jsonApi.deleteResources(id).then(data => console.log(data));
    this.jsonApi.deleteResources(id).then(this.updateData);
  }

  // Работа с input
  editApi = (e, id, atr) => {
    //console.log(id);
    //console.log(e.target.value);
    this.setState({
      updateItem: null
    });
     const {dataApi} = this.state;
     const updateItem = dataApi.filter(item => item._id === id)[0];
     const indexUpdate = dataApi.findIndex(item => item._id === id);
     //console.log(indexUpdate);
     //console.log(updateItem[0].data.name);

  switch (atr) {
    case 'name':
    // console.log('name');
    //console.log(this.state.name);
    updateItem.data.name = e.target.value;
      break;
    case 'age':
    //console.log('age');
     updateItem.data.age = e.target.value;
    break;
    default: break;
  }
  this.setState({
   dataApi: [...dataApi.slice(0, indexUpdate), updateItem, ...dataApi.slice(indexUpdate + 1) ],
   updateItem: updateItem
 });
};

  render(){
    console.log('render');

  if(this.state.dataApi){
    const tabsElements = this.renderTableItemsApi(this.state.dataApi);
    return (

      <div className="App">
      <Table hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    {tabsElements}
  </tbody>
</Table>
  <Button
    outline color="primary"
    className="update"
    onClick={this.onAddDataClick}>
    Добавить данные
  </Button>
      <UserModal
        ref={this.loginModalRef}>
          <UserForm
          click = {this.handleSubmit}
          updateName = {this.updateName}
          updateAge = {this.updateAge}/>
      </UserModal>
      </div>
    );

  }else{
    return (
      <div className="App">
      <Spinner/>
      </div>
    );
  }
  }
}
