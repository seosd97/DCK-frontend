import React from 'react';
import Axios from 'axios';
import LoadingDialog from './LoadingDialog';
import './Main.css';

class Main extends React.Component {
  constructor() {
    super();

    this.state = { tournamets: [] };
  }

  componentDidMount() {
    Axios.get('http://localhost:8080/champions')
      .then(res => {
        this.setState({ tournaments: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ tournaments: { status: 'request error' } });
      });
  }

  render() {
    const { tournaments } = this.state;
    const isLoading = tournaments == null || !Array.isArray(tournaments);

    return <main>{isLoading && <LoadingDialog />}</main>;
  }
}

export default Main;
