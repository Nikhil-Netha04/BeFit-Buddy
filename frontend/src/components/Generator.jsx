import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import SectionWrapper from './SectionWrapper';
import { SCHEMES, WORKOUTS } from '../utils/swoldier';
import Button from './Button';

function Header({ index, title, description }) {
    return (
        <div className="flex flex-col gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
                <p className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-500">{index}</p>
                <h4 className="text-2xl sm:text-3xl md:text-4xl text-white">{title}</h4>
            </div>
            <p className="text-base sm:text-lg text-gray-300">{description}</p>
        </div>
    );
}

export default function Generator({ muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // React Router navigation

    function toggleModal() {
        setShowModal(!showModal);
    }

    function updateMuscles(muscleGroup) {
        if (muscles.includes(muscleGroup)) {
            setMuscles(muscles.filter(val => val !== muscleGroup));
            return;
        }

        if (muscles.length > 2) return;

        if (poison !== 'individual') {
            setMuscles([muscleGroup]);
            setShowModal(false);
            return;
        }

        setMuscles([...muscles, muscleGroup]);
        if (muscles.length === 2) setShowModal(false);
    }

    function handleFormulate() {
        if (!poison || muscles.length === 0 || !goal) {
            alert('You have not selected all options. Please ensure to select a workout type, muscles, and goal.');
            return;
        }

        updateWorkout(); // Update workout state
        navigate('/workout'); // Redirect to Workout page
    }

    return (
        <SectionWrapper id="generate" header="Unleash Your Power" title={['Time to', 'CRUSH', 'IT']}>
            
            {/* Workout Type Selection */}
            <Header index="01" title="Choose Your Workout" description="Pick the type of workout that suits you best." />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(WORKOUTS).map((type, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setMuscles([]);
                            setPoison(type);
                        }}
                        className={`bg-gradient-to-r from-blue-800 to-purple-800 text-white px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md ${
                            type === poison ? 'border border-blue-500 shadow-lg' : 'border border-gray-500'
                        }`}
                    >
                        <p className="capitalize">{type.replaceAll('_', ' ')}</p>
                    </button>
                ))}
            </div>

            {/* Muscle Selection */}
            <Header index="02" title="Target Your Muscles" description="Select the muscle groups you want to train." />
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-blue-500 rounded-lg flex flex-col">
                <button onClick={toggleModal} className="relative p-4 flex items-center justify-center text-white hover:text-blue-400">
                    <p className="capitalize">{muscles.length === 0 ? 'Select muscle groups' : muscles.join(', ')}</p>
                    <i className="fa-solid absolute right-4 top-1/2 -translate-y-1/2 fa-caret-down"></i>
                </button>
                {showModal && (
                    <div className="flex flex-col px-4 pb-4">
                        {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscle, index) => (
                            <button
                                key={index}
                                onClick={() => updateMuscles(muscle)}
                                className={`text-lg uppercase py-2 transition-all hover:text-blue-400 ${
                                    muscles.includes(muscle) ? 'text-blue-400 font-semibold' : 'text-white'
                                }`}
                            >
                                {muscle.replaceAll('_', ' ')}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Goal Selection */}
            <Header index="03" title="Set Your Goal" description="Choose your fitness goal and let's achieve it!" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.keys(SCHEMES).map((scheme, index) => (
                    <button
                        key={index}
                        onClick={() => setGoal(scheme)}
                        className={`bg-gradient-to-r from-blue-800 to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            scheme === goal ? 'border border-blue-500 shadow-xl' : 'border border-gray-500'
                        }`}
                    >
                        <p className="capitalize">{scheme.replaceAll('_', ' ')}</p>
                    </button>
                ))}
            </div>

            {/* Formulate Button (Redirects to Workout Page) */}
            <Button func={handleFormulate} text="Formulate"></Button>
        </SectionWrapper>
    );
}
