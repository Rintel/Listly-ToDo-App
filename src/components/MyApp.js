import React from "react";

import Action from "./Action";
import Header from "./Header";
import Options from "./Options";
import AddOptions from "./AddOption";
import OptionModal from "./OptionModal";

export default class MyApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
    isOpen: false
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  
  handleClick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option }))
  };
  
  handleAddOption = (option) => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }))
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json)
    }
  };

  componentWillUnmount() {
    console.log("component will unmount");
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handleClick={this.handleClick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOptions
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal 
          handleClearSelectedOption={this.handleClearSelectedOption}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  };
};
