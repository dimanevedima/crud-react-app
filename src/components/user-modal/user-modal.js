import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class UserModal extends Component {
    state = {
      modal: false
    }

    toggle = () => {
      this.setState({
        modal: !this.state.modal
      })
      //console.log('toggle');
      //console.log(this.state.modal);
    }

render(){

  return (
    <Modal
      isOpen={this.state.modal}
      toggle={this.toggle}>
      <ModalHeader
          toggle={this.toggle}>
          Добавление данных
      </ModalHeader>
      <ModalBody>
        {this.props.children}
      </ModalBody>
      <ModalFooter>
        <Button
          outline color="danger"
          onClick={this.toggle}>Отменить</Button>
      </ModalFooter>
    </Modal>
  )
  }
}
