import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import {Table} from 'semantic-ui-react'
import {Button} from 'semantic-ui-react';

import styles from './styles.css';

@CSSModules(styles)
class View extends Component {
  render() {
    const links = this.props.links.data;
    const downloadLinks = [];
    links.forEach(link => {
      downloadLinks.push(
        <Table.Row key={downloadLinks.length}>
          <Table.Cell>{link.attributes.language}</Table.Cell>
          <Table.Cell>{link.attributes.quality}</Table.Cell>
          <Table.Cell>{link.attributes.host}</Table.Cell>
          <Table.Cell>{link.attributes.uploader}</Table.Cell>
          <Table.Cell><Button color='red' size='small'>DOWNLOAD</Button></Table.Cell>
        </Table.Row>
      );
    });
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
            {downloadLinks}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
export default View;
