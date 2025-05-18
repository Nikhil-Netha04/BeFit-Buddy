import React, { useState } from 'react';

export default function ExerciseCard(props) {
    const { exercise, i } = props;
    const [setsCompleted, setSetsComplete] = useState(0);

    function handleSetIncrement() {
        setSetsComplete((setsCompleted + 1) % 6);
    }

    return (
        <div className='card p-6 rounded-lg flex flex-col gap-6 bg-gray-900 shadow-lg border border-gray-800'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-6'>
                <h4 className='text-4xl text-blue-400 font-bold'>{`0${i + 1}`}</h4>
                <h2 className='capitalize text-2xl text-white font-semibold sm:text-center'>{exercise.name.replaceAll("_", " ")}</h2>
                <p className='text-md text-gray-400 italic'>{exercise.type}</p>
            </div>
            <div className='bg-gray-800 p-4 rounded-lg shadow-inner'>
                {exercise.description.split('___').map((val, index) => (
                    <div className='text-md text-gray-300' key={index}>{val}</div>
                ))}
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {['reps', 'rest', 'tempo'].map(info => (
                    <div key={info} className='p-3 rounded-lg border border-gray-700 bg-gray-800 text-center shadow-md'>
                        <h3 className='text-blue-300 text-md font-medium'>{info}</h3>
                        <p className='font-semibold text-white'>{exercise[info]}</p>
                    </div>
                ))}
                <button onClick={handleSetIncrement} className='p-3 rounded-lg border border-blue-600 bg-blue-800 hover:bg-blue-700 transition duration-200 shadow-md'>
                    <h3 className='text-blue-300 text-md font-medium'>Sets completed</h3>
                    <p className='text-white font-semibold'>{setsCompleted} / 5</p>
                </button>
            </div>
        </div>
    );
}
