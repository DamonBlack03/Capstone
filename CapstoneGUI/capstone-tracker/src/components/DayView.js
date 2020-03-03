import React, { useState }  from 'react'
import Modal from 'react-modal'

const DayView = props => {
    const [modalIsOpen, setModalOpen] = useState(false);
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };


    const openModal = () => {
        setModalOpen(true);
    };

    const openPopup = () => {
        openModal();
    };

    const afterOpenModal = () => {
    };
     
    const closeModal = () => {
        setModalOpen(false);
    }

    return(
        <>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    
                </Modal>
            </div>
                <div className="box-container">
                    <div className="box">
                        <div className="display-view">
                            Day {props.dayNum}
                        </div>
                        <div className="display-view">
                            <label className="display-label">Date: {props.date.toDateString()}</label>
                            <label className="display-label">Hours Worked: {props.worked}</label>
                            <label className="display-label">Hours Busy: {props.busy}</label>
                            <label className="display-label">Hours Sleep: {props.sleep}</label>
                            <label className="display-label">Hours Fun: {props.fun}</label>
                            <label className="display-label">Successful: {props.successful ? "yes" : "no"}</label>
                        </div>
                        <button type="button"
                            className="login-btn"
                            onClick={openPopup}> 
                            Show Tasks
                        </button>
                    </div>
                </div>
        </>
    );
};

export default DayView;