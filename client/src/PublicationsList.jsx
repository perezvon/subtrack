import React from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as actions from './actions';
import { Table } from './framework';

const moment = extendMoment(Moment);

const mapStateToProps = state => {
  return {...state};
}

const sortTable = by => {
  console.log(`sorting by ${by}`)
}

const PublicationsList = ({publications, openPublication}) => {
  const { all } = publications;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{textAlign: 'center'}} onClick={() => sortTable('name')}>Publication Name</th>
          <th style={{textAlign: 'center'}} onClick={() => sortTable('open')}>Open?</th>
        </tr>
      </thead>
      <tbody>
        {all && all.map(pub => {
          let openDate = moment(moment().format('YYYY') + '-' + pub.dateOpenMonth1 + '-' + pub.dateOpenDay1);
          let closeDate = moment(moment().format('YYYY') + '-' + pub.dateCloseMonth1 + '-' + pub.dateCloseDay1);
          if (closeDate === openDate || pub.alwaysOpen) pub.open = true;
          if (closeDate < openDate) closeDate = closeDate.add(1, 'year');
          const range = moment.range(openDate, closeDate);
          if (range.contains(moment())) pub.open = true;
          return (
            <tr key={pub._id || pub.slug} onClick={e => openPublication(pub)}>
              <td>{pub.name}</td>
              <td style={{textAlign: 'center'}}>{pub.open ? <i className='fas fa-check-square' style={{fontSize: '22px', color: '#478947'}}></i> : 'no'}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default connect(mapStateToProps, actions)(PublicationsList);
