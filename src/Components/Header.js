import React, { Component } from 'react'
import icon from "./images/chef-claude-icon.png"; //D:\code\react_scrimba\chef-claude\src\Components\images\chef-claude-icon.png

export default class Header extends Component {
  render() {
    return (
      <header>
        <img src={icon} alt="logo-icon"/>
        <h1>Chef Claude</h1>
    </header>
    )
  }
}
