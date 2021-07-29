import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';

export interface Users {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    verified: boolean;
    middle_initial: null | string;
    created_at: string;
    district: number;
    active: boolean;
    districtData: {
        id: number;
        city: string;
        name: string;
    };
}
[];
const fetchData = async (dataSource: string): Promise<any> => {
    try {
        const response = await fetch(dataSource);
        return await response.json();
        // setUsers(jsonUsers);
    } catch (err) {
        console.log('err', err);
    }
};

const combineFetchedData = (userData: any, districtsData: any): Users => {
    const combinedData = userData.reduce(
        (acc: any, user: { district: any }) => {
            const foundDistrict = districtsData.find(
                (districtData: { id: any }) => user.district === districtData.id
            );
            acc.push({ user, districtData: { ...foundDistrict } });
            return acc;
        },
        []
    );
    return combinedData;
};

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<Users>();
    const [test, setTest] = useState<number>(3);
    const getUserTableData = async () => {
        const userData: any = await fetchData('users.json');
        const districtsData: any = await fetchData('districts.json');
        setUsers(combineFetchedData(userData, districtsData));
    };
    useEffect(() => {
        getUserTableData();
    }, []);
    return (
        <div className="app-admin-panel">
            <UserTable users={users} />
        </div>
    );
};

export default AdminPanel;
