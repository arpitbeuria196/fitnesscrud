import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFitnessData, updateFitnessData, removeFitnessData } from '../utils/fitnessSlice';
import FitnessCardList from './FitnessCardList';
import { browserValidation } from '../utils/BrowserValidation';
import { FaSearch, FaSortAmountUp, FaSortAmountDown, FaEdit, FaTrashAlt } from 'react-icons/fa';

const MainContainer = () => {
    const activityRef = useRef(null);
    const durationRef = useRef(null);
    const dateRef = useRef(null);
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const fitnessRecords = useSelector((store) => store.fitness.records);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAscSort, setIsAscSort] = useState(true);
    const [search, setSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const activity = activityRef?.current?.value;
        const duration = durationRef?.current?.value;
        const date = dateRef?.current?.value;

        const validation = browserValidation(activity, duration);
        if (validation) {
            setErrorMessage(validation);
            return;
        }

        const fitnessData = {
            id: isEditing ? editId : Date.now(),
            activity,
            duration,
            date,
        };

        if (isEditing) {
            dispatch(updateFitnessData(fitnessData));
            setIsEditing(false);
            setEditId('');
        } else {
            dispatch(addFitnessData(fitnessData));
        }

        // Clear inputs
        activityRef.current.value = '';
        durationRef.current.value = '';
        dateRef.current.value = '';
        setErrorMessage('');
    };

    const onEditHandle = (fitness) => {
        activityRef.current.value = fitness.activity;
        durationRef.current.value = fitness.duration;
        dateRef.current.value = fitness.date;

        setIsEditing(true);
        setEditId(fitness.id);
    };

    const onDeleteHandle = (fitness) => {
        dispatch(removeFitnessData(fitness));
    };

    const onSortHandle = () => {
        setIsAscSort(!isAscSort);
    };

    const filteredRecords = fitnessRecords
        .filter((fitness) => fitness.activity.toLowerCase().includes(search.toLowerCase()))
        .slice()
        .sort((a, b) => (isAscSort ? a.duration - b.duration : b.duration - a.duration));

    return (
        <div className="max-w-4xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg bg-opacity-0">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <input
                        ref={activityRef}
                        type="text"
                        placeholder="Enter Activity"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        ref={durationRef}
                        type="text"
                        placeholder="Duration (in mins)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        ref={dateRef}
                        type="date"
                        placeholder="Enter Date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    {isEditing ? 'Update Record' : 'Add Record'}
                </button>
                {errorMessage && (
                    <p className="text-red-600 text-center py-2">{errorMessage}</p>
                )}
            </form>

            {/* Sort and Search */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={onSortHandle}
                    className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                    {isAscSort ? (
                        <>
                            <FaSortAmountUp className="mr-2" /> Sort Ascending
                        </>
                    ) : (
                        <>
                            <FaSortAmountDown className="mr-2" /> Sort Descending
                        </>
                    )}
                </button>

                <div className="flex items-center space-x-2">
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search activity..."
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="text-gray-500" />
                </div>
            </div>

            {/* Fitness Records */}
            <div className="mt-8 space-y-4">
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((fitness) => (
                        <div
                            key={fitness.id}
                            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
                        >
                            <div>
                                <p className="font-semibold text-lg">{fitness.activity}</p>
                                <p className="text-gray-600">Duration: {fitness.duration} mins</p>
                                <p className="text-gray-600">Date: {fitness.date}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    className="text-blue-500 hover:text-blue-700 transition"
                                    onClick={() => onEditHandle(fitness)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 transition"
                                    onClick={() => onDeleteHandle(fitness)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No records found</p>
                )}
            </div>
        </div>
    );
};

export default MainContainer;
