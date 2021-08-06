import React, { useState } from 'react';
import Modal from './Modal';
import UserForm from './UserForm';
import Filter from './Filter';
import {
    Users as AllUsersProps,
    User as UserProps,
} from '../containers/AdminPanel';
import { Districts as DistrictProps } from '../containers/AdminPanel';
import '../stylesheets/user-table.scss';
interface Props {
    users: AllUsersProps['users'];
    districts: DistrictProps['districtData'];
    setUsers: React.Dispatch<React.SetStateAction<Props['users']>>;
    onFilterReset: () => void;
}

const UserTable = ({
    districts,
    users,
    setUsers,
    onFilterReset,
}: Props): React.ReactElement => {
    const [selectedUser, setSelectedUser] = useState<any>();
    const [editUserModalIsOpen, setEditUserModalIsOpen] =
        useState<boolean>(false);
    const [addUserModalIsOpen, setAddUserModalIsOpen] =
        useState<boolean>(false);

    return (
        <div className="mx-4">
            <section className="mb-4 pt-2">
                <h1>Users</h1>
                <div className="d-flex justify-content-between">
                    <div>
                        <button
                            onClick={() => setAddUserModalIsOpen(true)}
                            className="btn btn-primary"
                        >
                            Add User
                        </button>
                    </div>

                    <Filter
                        allDistricts={districts}
                        onFilterSelect={(filters: {
                            activeToggle: boolean;
                            districtInput: number | string;
                        }) => {
                            const district = filters.districtInput !== '';
                            const filteredUsers = users.filter(
                                (user: UserProps) => {
                                    const activeMatch =
                                        user.active == filters.activeToggle;
                                    if (district) {
                                        return (
                                            activeMatch &&
                                            user.district ===
                                                filters.districtInput
                                        );
                                    }
                                    return activeMatch;
                                }
                            );
                            setUsers(filteredUsers);
                        }}
                        onFilterReset={onFilterReset}
                    />
                </div>
            </section>
            <div className="table-responsive">
                <table className="table table-striped admin-user-table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">M.I.</th>
                            <th scope="col" className="extended">
                                Email
                            </th>
                            <th scope="col">District</th>
                            <th scope="col">Verified</th>
                            <th scope="col">Active</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((userData: UserProps) => {
                                return (
                                    <tr
                                        key={userData.id}
                                        onClick={() => {
                                            setSelectedUser(userData);
                                            setEditUserModalIsOpen(true);
                                        }}
                                    >
                                        <td>{userData.id}</td>
                                        <td>{userData.last_name}</td>
                                        <td>{userData.first_name}</td>
                                        <td>{userData.middle_initial}</td>
                                        <td>{userData.email}</td>
                                        <td>
                                            {userData.districtData.name},{' '}
                                            {userData.districtData.city}
                                        </td>

                                        <td>
                                            {userData.verified
                                                ? 'True'
                                                : 'False'}
                                        </td>
                                        <td>
                                            {userData.active ? 'True' : 'False'}
                                        </td>
                                        <td>{userData.created_at}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={editUserModalIsOpen}
                title="Edit User"
                onClose={() => setEditUserModalIsOpen(false)}
            >
                {selectedUser && (
                    <UserForm
                        {...selectedUser}
                        numberOfUsers={users.length}
                        formType="edit"
                        allDistricts={districts}
                        onRemoveUser={() => {
                            const foundUserIndex = users.findIndex(
                                (userData: any) =>
                                    userData.id === selectedUser.id
                            );
                            setUsers([
                                ...users.slice(0, foundUserIndex),
                                ...users.slice(foundUserIndex + 1),
                            ]);
                        }}
                        onSubmit={(updatedUserData: UserProps) => {
                            const mergedUserData = {
                                ...selectedUser,
                                ...updatedUserData,
                            };
                            const foundUserIndex = users.findIndex(
                                (userData: UserProps) =>
                                    userData.id === mergedUserData.id
                            );
                            setUsers(
                                Object.assign([], users, {
                                    [foundUserIndex]: mergedUserData,
                                })
                            );
                        }}
                    />
                )}
            </Modal>
            <Modal
                isOpen={addUserModalIsOpen}
                title="Add User"
                onClose={() => setAddUserModalIsOpen(false)}
            >
                <UserForm
                    numberOfUsers={users.length}
                    formType="add"
                    allDistricts={districts}
                    onSubmit={(userData: UserProps) => {
                        setUsers([
                            ...users,
                            {
                                ...userData,
                            },
                        ]);
                    }}
                />
            </Modal>
        </div>
    );
};

export default UserTable;
