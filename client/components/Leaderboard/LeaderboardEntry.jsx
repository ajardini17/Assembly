import React from 'react';

class LeaderboardEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.item[0],
      portfolioName: this.props.item[1],
      value: this.props.item[2],
      index: this.props.index + 1
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.item[0],
      portfolioName: nextProps.item[1],
      value: nextProps.item[2],
      index: nextProps.index + 1
    })
  }
  render() {
    return (
      <tr>
        <td>{this.state.index} </td>
        <td>{this.state.username} </td>
        <td>{this.state.portfolioName} </td>
        <td>${this.state.value} </td>
      </tr>
    );
  }
}

export default LeaderboardEntry;