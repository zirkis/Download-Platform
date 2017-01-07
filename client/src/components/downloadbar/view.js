import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import {Table} from 'semantic-ui-react'
import {Button} from 'semantic-ui-react';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    const links = this.props.links.data;
    const language = this.props.language;
    console.log(links[0].attributes.language);
    return (
      <div styleName='container'>
        <Table styleName='table_links'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Format</Table.HeaderCell>
              <Table.HeaderCell>Host</Table.HeaderCell>
              <Table.HeaderCell>Uploader</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{links[0].attributes.language}</Table.Cell>
              <Table.Cell>{links[0].attributes.quality}</Table.Cell>
              <Table.Cell>{links[0].attributes.host}</Table.Cell>
              <Table.Cell>{links[0].attributes.uploader}</Table.Cell>
              <Table.Cell><Button color='red' size='small'>DOWNLOAD</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{links[1].attributes.language}</Table.Cell>
              <Table.Cell>{links[1].attributes.quality}</Table.Cell>
              <Table.Cell>{links[1].attributes.host}</Table.Cell>
              <Table.Cell>{links[1].attributes.uploader}</Table.Cell>

              <Table.Cell><Button color='red' size='small'>DOWNLOAD</Button></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{links[2].attributes.language}</Table.Cell>
              <Table.Cell>{links[2].attributes.quality}</Table.Cell>
              <Table.Cell>{links[2].attributes.host}</Table.Cell>
              <Table.Cell>{links[2].attributes.uploader}</Table.Cell>
              <Table.Cell><Button color='red' size='small'>DOWNLOAD</Button></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>


    )
  }
}
export default View;
