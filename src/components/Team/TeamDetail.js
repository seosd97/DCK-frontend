import React from 'react';
import Axios from 'axios';
import _ from 'underscore';

class TeamDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      teamData: {}
    };
  }

  async componentDidMount() {
    const res = await Axios.get(`http://localhost:8080/team/${this.props.match.params.name}`);
    this.setState({
      teamData: res.data
    });
  }

  render() {
    return <div>{!_.isEmpty(this.state.teamData) && this.state.teamData.name}</div>;
  }
}

export default TeamDetail;
