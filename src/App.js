import React, { Component } from "react";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const { data } = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: data, loading: false });
  // }

  //Search Github users
  searchUsers = async (text) => {
    this.setState({loading: true});
    
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: data.items, loading: false });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
