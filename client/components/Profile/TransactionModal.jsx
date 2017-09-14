import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'
import TransactionHistory from './TransactionHistory.jsx'

export default class TransactionModal extends Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false
    }
    this.close = this.close.bind(this)

  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.showModal){
      this.setState({
        showModal: nextProps.showModal
      })
    } else {
      this.setState({transactions: nextProps.transactions})

    }
  }

  close(){
    this.setState({showModal: false})
  }

  render(){
    return (
      <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-lg" className="transaction-modal-title">Buy/Sell History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <TransactionHistory transactions={this.props.transactions}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}