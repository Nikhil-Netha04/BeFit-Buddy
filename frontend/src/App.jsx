import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import Auth from "./components/Auth"; 
import { generateWorkout } from "./utils/functions";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState("strength_power");

  function updateWorkout() {
    if (muscles.length < 1) return;
    const newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/exercise"
            element={
              <Generator
                poison={poison}
                setPoison={setPoison}
                muscles={muscles}
                setMuscles={setMuscles}
                goal={goal}
                setGoal={setGoal}
                updateWorkout={updateWorkout}
              />
            }
          />
          <Route
            path="/workout"
            element={
              workout ? <Workout workout={workout} /> : <Navigate to="/exercise" />
            }
          />
          <Route path="/signup" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SignedIn>
    </div>
  );
}

export default App;
