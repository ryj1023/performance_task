import React from 'react';
import Filter from './Filter';
import { Users as Props } from '../containers/AdminPanel'; // importing the state interface allows us to define it as props here

interface UserProps {
    users?: Props;
}
const UserTable: React.FC<UserProps> = (props): React.ReactElement => {
    console.log('props', props);
    const handleEditUser = () => {
        console.log('');
    };

    const handleDeleteUser = () => {
        console.log('');
    };

    return (
        // <div className="admin-user-table" style={{ marginTop: '7rem' }}>
        //     <Filter />
        //     <div
        //         style={{
        //             border: '1px solid black',
        //             width: '50rem',
        //             marginTop: '2rem',
        //         }}
        //     >
        //         <h2
        //             className="text-primary"
        //             style={{ textAlign: 'center', textDecoration: 'underline' }}
        //         >
        //             Users
        //         </h2>
        //         <ul
        //             style={{
        //                 listStyle: 'none',
        //                 paddingLeft: 0,
        //                 height: '30rem',
        //             }}
        //         >
        //             <li
        //                 style={{
        //                     fontWeight: 700,
        //                     borderBottom: '2px solid black',
        //                     marginBottom: '1rem',
        //                     padding: '1rem',
        //                 }}
        //             >
        //                 <div
        //                     style={{
        //                         display: 'flex',
        //                         justifyContent: 'space-evenly',
        //                         textAlign: 'center',
        //                     }}
        //                 >
        //                     <div style={{ width: '5%' }}>ID</div>
        //                     <div style={{ width: '20%' }}>Last Name</div>
        //                     <div style={{ width: '20%' }}>First Name</div>
        //                     <div style={{ width: '5%' }}>M.I.</div>
        //                     <div style={{ width: '20%' }}>District</div>
        //                     <div style={{ width: '10%' }}>Verified</div>
        //                     <div style={{ width: '20%' }}>Created</div>
        //                 </div>
        //             </li>
        //             <li
        //                 style={{
        //                     marginBottom: '2rem',
        //                     background: '#fff',
        //                     border: '1px solid black',
        //                     padding: '1rem',
        //                 }}
        //             >
        //                 <div
        //                     style={{
        //                         display: 'flex',
        //                         justifyContent: 'space-evenly',
        //                         textAlign: 'center',
        //                         marginBottom: '0.5rem',
        //                     }}
        //                 >
        //                     <div style={{ width: '5%' }}>108</div>
        //                     <div style={{ width: '20%' }}>Smith</div>
        //                     <div style={{ width: '20%' }}>Robert</div>
        //                     <div style={{ width: '5%' }}>J</div>
        //                     <div style={{ width: '20%' }}>Cure District</div>
        //                     <div style={{ width: '10%' }}>True</div>
        //                     <div style={{ width: '20%' }}>June 18, 2020</div>
        //                 </div>
        //                 <div
        //                     style={{
        //                         marginLeft: 'auto',
        //                         width: '10rem',
        //                         display: 'flex',
        //                         justifyContent: 'space-between',
        //                         paddingRight: '2rem',
        //                     }}
        //                 >
        //                     <button type="button">Edit</button>
        //                     <button type="button">Delete</button>
        //                 </div>
        //             </li>
        //             <li
        //                 style={{
        //                     marginBottom: '2rem',
        //                     background: '#fff',
        //                     border: '1px solid black',
        //                     padding: '1rem',
        //                 }}
        //             >
        //                 <div
        //                     style={{
        //                         display: 'flex',
        //                         justifyContent: 'space-evenly',
        //                         textAlign: 'center',
        //                         marginBottom: '0.5rem',
        //                     }}
        //                 >
        //                     <div style={{ width: '5%' }}>142</div>
        //                     <div style={{ width: '20%' }}>Morrissey</div>
        //                     <div style={{ width: '20%' }}>Steven</div>
        //                     <div style={{ width: '5%' }}>P</div>
        //                     <div style={{ width: '20%' }}>Cure District</div>
        //                     <div style={{ width: '10%' }}>True</div>
        //                     <div style={{ width: '20%' }}>June 18, 2020</div>
        //                 </div>
        //                 <div
        //                     style={{
        //                         marginLeft: 'auto',
        //                         width: '10rem',
        //                         display: 'flex',
        //                         justifyContent: 'space-between',
        //                         paddingRight: '2rem',
        //                     }}
        //                 >
        //                     <button type="button">Edit</button>
        //                     <button type="button">Delete</button>
        //                 </div>
        //             </li>
        //         </ul>
        //     </div>
        // </div>

        <table
            className="table table-striped admin-user-table m-4"
            style={{ marginTop: '7rem', width: '50rem' }}
        >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat </td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    );
};

export default UserTable;
