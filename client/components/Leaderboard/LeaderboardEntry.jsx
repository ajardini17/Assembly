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
        <td className='leaderboardTableData'>{this.state.index} </td>
        <td className='leaderboardTableData'>{this.state.username} </td>
        <td className='leaderboardTableData'>{this.state.portfolioName} </td>
        <td className='leaderboardTableData'>{this.state.value < 0 ? <span>-</span> : null}${Math.abs(this.state.value).toFixed(2)} </td>
      </tr></LinkContainer>
    );
  }
}

export default LeaderboardEntry;