import React from 'react';
import 'react-responsive-modal/styles.css';
import ResponsiveModal from 'react-responsive-modal';
import '../stylesheets/modal.scss';
interface Props {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const Modal = ({
    title,
    isOpen,
    onClose,
    children,
}: Props): React.ReactElement => {
    return (
        <ResponsiveModal
            open={isOpen}
            onClose={() => onClose()}
            center
            showCloseIcon={false}
        >
            <>
                <div className={`modal-header position-relative p-0`}>
                    <h5 className="modal-title w-100 font-weight-bold">
                        {title}
                    </h5>

                    <button
                        tabIndex={-1}
                        className="btn close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => onClose()}
                        style={{ padding: '0.8rem' }}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                {children}
            </>
        </ResponsiveModal>
    );
};

export default Modal;
