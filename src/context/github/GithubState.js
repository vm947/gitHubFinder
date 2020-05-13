import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
  ONCHANGE_TEXT,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    text: "",
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search users
  const searchUsers = async (text) => {

    setLoading();

    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: data.items,
    });

  };

  // get user
  const getUser = async (username) => {
    setLoading();

    const { data } = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: GET_USER,
      payload: data,
    });
    
  };
  //get repos
  const getUserRepos = async (username) => {
    setLoading();

    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  //set text state
  const onChange = (e) => {
    dispatch({
      type: ONCHANGE_TEXT,
      payload: e.target.value,
    });
  };

  //clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        text: state.text,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        onChange
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
