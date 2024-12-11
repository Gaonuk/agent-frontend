import WorkoutPlanner from "../components/WorkoutPlanner";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<h1 className="text-4xl font-bold mb-8">AI Workout Planner</h1>
			<WorkoutPlanner />
		</main>
	);
}
