import React from 'react';
import TransactionHistoryEntry from './TransactionHistoryEntry'; 

export default class TransactionHistory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            entries: ''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            entries: nextProps.entries
        })
    }
    render() {
        return (
            <div>
                {this.props.entries.map((key, index) => (
                    <TransactionHistoryEntry item={item} key={index}/>
                ))}
            </div>
        );
    }
}
