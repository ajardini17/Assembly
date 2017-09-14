import React from 'react';
import TransactionHistoryEntry from './TransactionHistoryEntry.jsx'; 
import axios from 'axios'

export default class TransactionHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            transactions: []
        }
        this.timeHandler = this.timeHandler.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      this.setState({transactions: nextProps.transactions}, () => { console.log('TRANSACTIONS', this.state.transactions) })
    } 
    timeHandler(date){
      if(Date.now() - date < 1000 * 60 * 15){
        return "a few minutes ago"
      } else if(Date.now() - date < 60 * 60 * 1000){
        return "less than an hour ago"
      } else if(Date.now() - date < 60 * 60 * 3 * 1000){
        return "less than a few hours ago"
      } else if(Date.now() - date < 60 * 60 * 24 * 1000){
        return "less than a day ago"
      } else if(Date.now() - date < 60 * 60 * 24 * 3 * 1000){
        return "a few days ago"
      } else if(Date.now() - date < 60* 60 * 24 * 7 * 1000){
        return "less than a week"
      } else if(Date.now() - date < 60 * 60 * 24 * 7 * 4 * 1000){
        return "less than a month"
      } else {
        return "more than a month"
      }
    }
    render() {
        return (
            <div >
         
              <div className='row'>
               <div className='col-xs-2 col-xs-offset-1'>Coin</div>
               <div className='col-xs-2'>Buy/Sell?</div>
               <div className='col-xs-2'>Quantity</div>
               <div className='col-xs-2'>Coin price</div>
               <div className='col-xs-3'>When</div>
             </div >
             <hr/>
                {this.state.transactions ? this.state.transactions.map((item, index) => (
                    <TransactionHistoryEntry item={item} key={index} timeHandler={this.timeHandler}/>
                ))
                :
                null}
            </div>
        );
    }
}
