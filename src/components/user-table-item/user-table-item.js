import React from 'react';
import { Input, Button} from 'reactstrap';

const UserTableItem = ({_id, data, index, editName, editAge, onUpdate, onDelete}) => {
  return(
      <tr
      key = {_id}
      data-key = {`${_id}`}
      >
        <th scope="row">{index + 1}</th>
        <td>
               <Input
               className="border-0"
               value ={data.name}
               onChange = {(e) => editName(e, _id, 'name')}
               disabled
               />
       </td>
        <td>
               <Input
               className="border-0"
               value = {data.age}
               onChange = {(e) => editAge(e, _id, 'age')}
               disabled
               />
       </td>
        <td>
              <Button
                outline color="primary"
                className="btn-sm update"
                // class = 'update'
                onClick = {onUpdate}
                >
                Изменить
                </Button>
          </td>
        <td>
                <Button
                color="danger"
                className="btn-trash btn-sm update"
                onClick = {onDelete}
                >
                <i className="fa fa-trash-o"></i>
                </Button>
        </td>
      </tr>
  )
}

export default UserTableItem;
