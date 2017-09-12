import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

class LeaderboardEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.item.username,
      portfolioName: this.props.item.portfolioName,
      value: this.props.item.portfolioValue,
      portfolioId: this.props.item.portfolioId,
      index: this.props.index + 1
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.item.username,
      portfolioName: nextProps.item.portfolioName,
      value: nextProps.item.portfolioValue,
      portfolioId: nextProps.item.portfolioId,
      index: nextProps.index + 1
    })
  }

  
  render() {

    return (
      <LinkContainer to={`/simulator/${this.state.portfolioId}`}><tr className ='leaderboard-entry' >
        <td>{this.state.index} </td>
        <td>{this.state.username} </td>
        <td>{this.state.portfolioName} </td>
        <td>${this.state.value} </td>
      </tr></LinkContainer>
    );
  }
}

export default LeaderboardEntry;