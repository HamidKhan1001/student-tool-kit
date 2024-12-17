import React from 'react';
import { Modal } from 'react-bootstrap';

const PDFModal = ({ show, onHide, pdfUrl }) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg" 
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Document Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        >
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </object>
      </Modal.Body>
    </Modal>
  );
};

export default PDFModal;