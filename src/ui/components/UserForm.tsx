import React from 'react';
import FormResponse from './FormResponse';
import { Districts as DistrictProps } from '../containers/AdminPanel';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../stylesheets/user-edit-form.scss';

const twoDigits = (d: any) => {
    if (0 <= d && d < 10) return '0' + d.toString();
    if (-10 < d && d < 0) return '-0' + (-1 * d).toString();
    return d.toString();
};
const toMySqlFormat = (date: any) => {
    return (
        date.getUTCFullYear() +
        '-' +
        twoDigits(1 + date.getUTCMonth()) +
        '-' +
        twoDigits(date.getUTCDate()) +
        ' ' +
        twoDigits(date.getUTCHours()) +
        ':' +
        twoDigits(date.getUTCMinutes()) +
        ':' +
        twoDigits(date.getUTCSeconds())
    );
};

const alphabetTest = (value: string): boolean => {
    return /^[a-zA-Z\s]*$/.test(value);
};

const validation = Yup.object().shape({
    first_name: Yup.string()
        .required('First Name is required')
        .test('alphabets', 'Must only contain alphabet characters', (value) =>
            alphabetTest(value || '')
        ),
    last_name: Yup.string()
        .required('Last Name is required')
        .test('alphabets', 'Must only contain alphabet characters', (value) =>
            alphabetTest(value || '')
        ),
    middle_initial: Yup.string()
        .test('alphabets', 'Must only contain alphabet characters', (value) =>
            alphabetTest(value || '')
        )
        .max(1, 'Must be only one character'),
    // .nullable(),
    email: Yup.string()
        .required('Email is required')
        .email('Must have valid email'),
    district: Yup.number().required('District is required'),
});

type Props = {
    first_name?: string;
    last_name?: string;
    email?: string;
    middle_initial?: string;
    district?: number;
    verified?: boolean;
    onSubmit: (props: any) => void;
    onRemoveUser?: () => void | undefined;
    allDistricts: DistrictProps['districtData'];
    formType: string;
    numberOfUsers: number;
};

const UserForm = ({
    first_name,
    last_name,
    email,
    middle_initial,
    district,
    verified,
    onSubmit,
    onRemoveUser,
    allDistricts,
    formType,
    numberOfUsers,
}: Props): React.ReactElement => {
    return (
        <Formik
            initialValues={{
                first_name: first_name || '',
                last_name: last_name || '',
                middle_initial: middle_initial || '',
                email: email || '',
                district: district || '',
                verified: verified || false,
            }}
            validationSchema={validation}
            onSubmit={async (
                {
                    first_name,
                    last_name,
                    middle_initial,
                    email,
                    district,
                    verified,
                },
                { setStatus }
            ) => {
                const updatedDistrict =
                    allDistricts &&
                    allDistricts.find(({ id }: { id: number }) => {
                        return id === Number(district);
                    });
                const addUserData =
                    formType === 'add'
                        ? {
                              id: numberOfUsers + 1,
                              created_at: toMySqlFormat(new Date()),
                          }
                        : {};
                const middleInitialClone = middle_initial;

                const updatedUserData = {
                    ...addUserData,
                    first_name,
                    last_name,
                    middle_initial: middleInitialClone.toUpperCase(),
                    email,
                    verified,
                    district: Number(district),
                    districtData: {
                        ...updatedDistrict,
                    },
                };
                onSubmit(updatedUserData);
                setStatus({
                    success: `User has been ${
                        formType === 'add' ? 'created' : 'updated'
                    }.`,
                });
            }}
        >
            {(formikProps) => {
                const {
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    submitCount,
                    status,
                    setStatus,
                } = formikProps;

                return (
                    <form onSubmit={handleSubmit} className="my-3">
                        <div className="d-flex mb-2">
                            <div className="form-group me-2">
                                <label htmlFor="first_name" className="mb-1">
                                    First Name
                                </label>
                                <span className="text-danger ms-1">*</span>
                                <input
                                    tabIndex={0}
                                    type="text"
                                    name={'first_name'}
                                    value={values.first_name}
                                    className={`w-100 form-control`}
                                    onChange={handleChange}
                                />
                                <div className="text-danger feedback-input-text">
                                    {touched.first_name &&
                                        errors.first_name &&
                                        errors.first_name}
                                </div>
                            </div>
                            <div className="form-group me-2">
                                <label htmlFor="last_name" className="mb-1">
                                    Last Name
                                </label>
                                <span className="text-danger ms-1">*</span>
                                <input
                                    className="form-control"
                                    name="last_name"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.last_name}
                                />
                                <div className="text-danger feedback-input-text">
                                    {touched.last_name &&
                                        errors.last_name &&
                                        errors.last_name}
                                </div>
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="middle_initial"
                                    className="mb-1"
                                >
                                    Middle Initial
                                </label>
                                <input
                                    className="form-control middle-initial-input"
                                    name="middle_initial"
                                    type="string"
                                    onChange={handleChange}
                                    value={values.middle_initial}
                                />
                                <div className="text-danger feedback-input-text">
                                    {touched.middle_initial &&
                                        errors.middle_initial &&
                                        errors.middle_initial}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="form-group me-2">
                                <label htmlFor="email" className="mb-1">
                                    Email
                                </label>
                                <span className="text-danger ms-1">*</span>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <div className="text-danger feedback-input-text">
                                    {touched.email &&
                                        errors.email &&
                                        errors.email}
                                </div>
                            </div>
                            <div className="form-group me-2">
                                <label htmlFor="district" className="mb-1">
                                    District
                                </label>
                                <span className="text-danger ms-1">*</span>
                                <select
                                    className="form-control form-select"
                                    name="district"
                                    onChange={handleChange}
                                    value={values.district}
                                >
                                    <option hidden value={''}>
                                        Choose One
                                    </option>
                                    {allDistricts &&
                                        allDistricts.map(
                                            ({
                                                id,
                                                name,
                                                city,
                                            }: {
                                                id: number;
                                                name: string;
                                                city: string;
                                            }) => {
                                                return (
                                                    <option key={id} value={id}>
                                                        {`${name}, ${city}`}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>
                                <div className="text-danger feedback-input-text">
                                    {touched.district &&
                                        errors.district &&
                                        errors.district}
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="form-group">
                                <label
                                    className="custom-control-label"
                                    htmlFor="verified"
                                >
                                    Verified
                                </label>
                                <div className="custom-control">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={'verified'}
                                        id="verified"
                                        checked={values.verified}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="feedback-input-text"></div>
                            </div>
                        </div>
                        <div>
                            <FormResponse
                                success={status && status.success}
                                alert={
                                    Object.keys(errors).length > 0 &&
                                    submitCount > 0
                                        ? 'Please review fields and submit again.'
                                        : null
                                }
                            />
                            <div className="d-flex justify-content-between">
                                <button
                                    disabled={
                                        (Object.keys(errors).length > 0 &&
                                            submitCount > 0) ||
                                        (status && status.success)
                                    }
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                                {formType === 'edit' && (
                                    <button
                                        disabled={status && status.success}
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            const response = confirm(
                                                'Are you sure you want to remove this user?'
                                            );
                                            if (response) {
                                                setStatus({
                                                    success:
                                                        'User has been removed.',
                                                });
                                                onRemoveUser && onRemoveUser();
                                            }
                                        }}
                                    >
                                        Remove User
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};
export default UserForm;
