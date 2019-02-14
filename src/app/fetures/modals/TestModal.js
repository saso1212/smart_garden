import React from 'react';
import {Modal} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {closeModal} from './modalActions'

const TestModal = ({closeModal}) => {
    return (
        <Modal closeIcon="close" open={true} onClose={closeModal}>
          <Modal.Header>Test Modal</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>Test Modal... nothing to see here</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    );
};
const mapDisptchToProps={
    closeModal
}

export default connect(null,mapDisptchToProps)(TestModal);