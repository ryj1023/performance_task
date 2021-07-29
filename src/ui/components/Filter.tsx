import React, { useState } from 'react'

const Filter: React.FC = () => {
    const [state, setState] = useState({
        districtInput: '',
        activeToggle: false,
    })

    const handleChange = () => {
        console.log('')
    }

    return (
        <div>
            <label htmlFor="district">Filter by District: </label>
            <select
                name="district"
                value={state.districtInput}
                onChange={handleChange}
            >
                <option>District One</option>
                <option>District Two</option>
            </select>
            <br />
            <label htmlFor="activeUsers">Active Users Only: </label>
            <input
                type="checkbox"
                name="activeUsers"
                checked={state.activeToggle}
                onChange={handleChange}
            />
        </div>
    )
}

export default Filter
