import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';

class View extends Component {
  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          Film
          <Menu.Menu>
            <Menu.Item name='add_film'
                       onClick={() => {this.props.redirect('/add/film');}}>
              Add
            </Menu.Item>
            <Menu.Item name='remove_film'>
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          Serie
          <Menu.Menu>
            <Menu.Item name='add_serie'
                       onClick={() => {this.props.redirect('/add/serie');}}>
              Add
            </Menu.Item>
            <Menu.Item name='add_episode'
                       onClick={() => {this.props.redirect('/add/episode');}}>
              Add episode
            </Menu.Item>
            <Menu.Item name='remove_serie'>
              Remove
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}
export default View;
