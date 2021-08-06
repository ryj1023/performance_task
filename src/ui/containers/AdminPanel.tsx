import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
interface District {
    id: number;
    city: string;
    name: string;
}
export interface User {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    verified?: boolean;
    middle_initial?: null | string;
    created_at?: string;
    district?: number;
    active?: boolean;
    districtData: District;
}

export interface Districts {
    districtData: District[];
}

export interface Users extends Districts {
    users: User[];
}

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<Users['users']>([]);
    const [districts, setDistricts] = useState<Districts['districtData']>([]);
    const fetchData = async (dataSource: string): Promise<any> => {
        try {
            const response = await fetch(dataSource);
            return await response.json();
        } catch (err) {
            console.log('err', err);
        }
        return null;
    };

    const combineFetchedData = (
        userData: Users['users'],
        districtsData: Users['districtData']
    ): Users['users'] => {
        const combinedData = userData.reduce((acc: any, user: User) => {
            const foundDistrict = districtsData.find(
                (districtData: { id: number }) =>
                    user.district === districtData.id
            );
            acc.push({ ...user, districtData: { ...foundDistrict } });
            return acc;
        }, []);
        return combinedData;
    };
    const getUserTableData = async () => {
        const userData: Users['users'] = await fetchData('users.json');
        const districtsData: Users['districtData'] = await fetchData(
            'districts.json'
        );
        setDistricts(districtsData);
        setUsers(combineFetchedData(userData, districtsData));
    };
    useEffect(() => {
        // get district and user data to be used in the User table.
        getUserTableData();
    }, []);

    const isLoadingUsers: boolean = users.length > 0 ? false : true;
    return (
        <div className="app-admin-panel">
            {isLoadingUsers ? (
                <div className="d-flex justify-content-center align-items-center w-100">
                    <div
                        className="spinner-border m-5"
                        style={{ width: '8rem', height: '8rem' }}
                        role="status"
                    ></div>
                </div>
            ) : (
                <UserTable
                    users={users}
                    districts={districts}
                    setUsers={setUsers}
                    onFilterReset={() => {
                        getUserTableData();
                    }}
                />
            )}
        </div>
    );
};

export default AdminPanel;
