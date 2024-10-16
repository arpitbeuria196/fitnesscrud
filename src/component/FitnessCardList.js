import React from 'react';

const FitnessCardList = ({ record, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h4 className="text-lg font-semibold text-white">Activity: {record.activity}</h4>
            <p className="text-gray-300">Duration: {record.duration} mins</p>
            <p className="text-gray-300">Date: {record.date}</p>
            <div className="mt-4 flex justify-between">
                <button 
                    onClick={onEdit} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-200">
                    Edit
                </button>
                <button 
                    onClick={onDelete} 
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FitnessCardList;
