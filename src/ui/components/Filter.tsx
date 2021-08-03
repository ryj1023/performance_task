import React, { useState } from 'react';
import { Districts as DistrictProps } from '../containers/AdminPanel';
import Modal from './Modal';

type FilterState = {
    districtInput: string | number;
    activeToggle: boolean;
};
interface Props {
    allDistricts: DistrictProps['districtData'];
    onFilterReset: () => void;
    onFilterSelect: (data: FilterState) => void;
}

const Filter = ({
    onFilterSelect,
    allDistricts,
    onFilterReset,
}: Props): React.ReactElement => {
    const initialState = {
        districtInput: '',
        activeToggle: false,
    };
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
    const [filterState, setFilterState] = useState<FilterState>(initialState);
    return (
        <div>
            <div className="d-flex">
                <div>
                    {!filtersApplied && (
                        <button
                            className="btn btn-secondary ms-2 text-decoration-none"
                            onClick={() => {
                                setModalIsOpen(true);
                            }}
                        >
                            Add Filters
                        </button>
                    )}
                </div>
                {filtersApplied && (
                    <div>
                        <button
                            className="btn btn-link ms-2 text-decoration-none"
                            onClick={() => {
                                setFiltersApplied(false);
                                setFilterState(initialState);
                                onFilterReset();
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
            <Modal
                title="Filter"
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <div className="my-3">
                    <div className="mb-3">
                        <label
                            className="text-nowrap me-1 mb-1"
                            htmlFor="district"
                        >
                            Filter by District{' '}
                        </label>
                        <select
                            className="form-control form-select"
                            name="district"
                            value={filterState.districtInput}
                            onChange={(e) => {
                                setFilterState((prevState: FilterState) => {
                                    const updatedState = {
                                        ...prevState,
                                        districtInput: Number(e.target.value),
                                    };
                                    return updatedState;
                                });
                            }}
                        >
                            <option
                                value=""
                                hidden={filterState.districtInput === ''}
                            >
                                All
                            </option>
                            {allDistricts &&
                                allDistricts.map(({ id }: { id: number }) => {
                                    return (
                                        <option value={id} key={id}>
                                            {id}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="me-1 d-block" htmlFor="activeUsers">
                            Active Users Only{' '}
                        </label>

                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="activeUsers"
                            id="activeUsers"
                            checked={filterState.activeToggle}
                            onChange={() => {
                                setFilterState((prevState: FilterState) => {
                                    const updatedState = {
                                        ...prevState,
                                        activeToggle: !prevState.activeToggle,
                                    };
                                    return updatedState;
                                });
                            }}
                        />
                    </div>
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => {
                            onFilterSelect(filterState);
                            setFiltersApplied(true);
                            setModalIsOpen(false);
                        }}
                    >
                        Filter
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Filter;
