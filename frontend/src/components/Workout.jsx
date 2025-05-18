import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import ExerciseCard from './ExerciseCard';

export default function Workout({ workout }) {
    const [loading, setLoading] = useState(true);
    const [displayWorkouts, setDisplayWorkouts] = useState(false);

    useEffect(() => {
        // Simulate loading of workouts (e.g., fetching data from API)
        setTimeout(() => {
            setLoading(false); // Set loading to false after data is loaded
        }, 2000); // Simulate 2 seconds of loading time
    }, []);

    const handleFormulateClick = () => {
        setDisplayWorkouts(true); // Show workouts after clicking formulate
    };

    return (
        <SectionWrapper id={'workout'} header={"Brace Yourself for"} title={['The', 'ULTIMATE', 'WORKOUT']}>
            
            {loading ? (
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
                        <p className="text-xl text-gray-700">Hang tight, workouts are loading...</p>
                    </div>
                    <p className="text-sm text-gray-500">It might take a moment!</p>
                </div>
            ) : (
                <>
                    <button 
                        onClick={handleFormulateClick} 
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg shadow-md transform transition duration-200 hover:scale-105 hover:from-teal-500 hover:to-blue-500 mt-4"
                    >
                        Formulate Your Workout Plan
                    </button>

                    {displayWorkouts && (
                        <div className='flex flex-col gap-6 mt-8'>
                            {workout.map((exercise, i) => (
                                <ExerciseCard i={i} exercise={exercise} key={i} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </SectionWrapper>
    );
}
