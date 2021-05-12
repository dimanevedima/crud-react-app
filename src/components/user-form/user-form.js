import React from 'react';

import { Input, Button, Form, FormGroup, Label} from 'reactstrap';
import './user-form.css';

const  UserForm = ({click, updateName, updateAge}) => {
 //onSubmit = {click}
    return (
      <Form inline>
          <FormGroup>
            <Label for="name" className='m-1'>Name: </Label>
            <Input
            className='m-1'
            onChange = {updateName}
             />
          </FormGroup>

          <FormGroup >
            <Label for="age" className='m-1'>Age: </Label>
            <Input
              className='m-3'
              onChange = {updateAge}
             />
          </FormGroup>
          <FormGroup >
              <Button
               outline color="info"
               className='m-1'
               onClick = {click}>
               Добавить
               </Button>
          </FormGroup>
        </Form>
    )
}

export default UserForm;
