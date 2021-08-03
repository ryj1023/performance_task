import React from 'react';

type Props = {
    success: string | null;
    alert: string | null;
};

const FormResponse = ({ success, alert }: Props): React.ReactElement => {
    const formResponse = success || alert;

    const getAlertColor = () => {
        if (success) {
            return 'success';
        } else {
            return 'warning';
        }
    };

    const AlertText = (): React.ReactElement => {
        if (success) {
            return <span className="fw-bold me-2">Success:</span>;
        } else {
            return <span className="fw-bold me-2">Alert:</span>;
        }
    };

    return (
        <>
            {formResponse && (
                <div
                    className={`w-100 alert alert-${getAlertColor()} d-flex alert-dismissible d-flex align-items-center`}
                    role="alert"
                >
                    <span className="mr-1"></span>
                    <AlertText /> {formResponse}
                </div>
            )}
        </>
    );
};

export default FormResponse;
