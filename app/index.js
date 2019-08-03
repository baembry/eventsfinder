import '@babel/polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//components
import Event from './components/Event';
import Input from './components/Input';

//custom modules and utilities
import http from '../http/http';
import keyMaker from '../utils/makeKey';
import tryCatch from '../utils/tryCatch';

const key = keyMaker();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      events: [],
      page: 1,
      editText: false,
    };
    this.handleEditButton = this.handleEditButton.bind(this);
  }

  getEvents() {
    tryCatch(async () => {
      const events = await http.getEvents(
        this.state.searchText,
        this.state.page
      );
      this.setState({ events });
    });
  }

  handleSearch(event) {
    //enter key === 13
    if (event.keyCode === 13) {
      this.getEvents();
      document.getElementById('search').value = '';
    } else {
      let searchText = event.target.value;
      this.setState({ searchText });
    }
  }

  handleEditButton(text) {
    console.log('Edit', text);
    this.setState({ editText: text });
  }

  handleEdit(event) {
    if (event.keyCode === 13) {
      //submit edit
      let editText = event.target.value;
      //submit edit text
      console.log('submitting... ', editText);
      document.getElementById('edit').value = '';
      this.setState({ editText: false });
    }
  }

  handlePageTurn(number) {
    tryCatch(async () => {
      let page = this.state.page;
      page += number;
      if (page < 0) {
        return;
      }
      await this.setState({ page });
      this.getEvents();
    });
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="search">Search by keyword: </label>
          <input
            id="search"
            type="text"
            name="search"
            onKeyDown={event => {
              this.handleSearch(event);
            }}
          />
        </div>
        {this.state.editText ? (
          <input
            id="edit"
            type="text"
            name="edit"
            size={this.state.editText.length}
            defaultValue={this.state.editText}
            onKeyDown={event => {
              this.handleEdit(event);
            }}
          />
        ) : null}
        {this.state.events.length > 0 ? (
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                </tr>
                {this.state.events.map(event => (
                  <Event
                    key={key()}
                    eventObj={event}
                    handleEdit={text => this.handleEditButton(text)}
                  />
                ))}
              </tbody>
            </table>
            <button onClick={() => this.handlePageTurn(-1)}>Previous 10</button>
            <span>Page {this.state.page}</span>
            <button onClick={() => this.handlePageTurn(1)}>Next 10</button>
          </div>
        ) : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
