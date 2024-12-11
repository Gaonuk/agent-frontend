"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function WorkoutPlanner() {
	const [exercises, setExercises] = useState([]);
	const [numExercises, setNumExercises] = useState(5);

	const { complete, completion, isLoading } = useCompletion({
		api: "/api/generate-workout",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const prompt = e.currentTarget.prompt.value;
		const response = await complete(prompt);
		if (response) {
			setExercises(JSON.parse(response));
		}
	};

	return (
		<div className="w-full max-w-2xl">
			<form onSubmit={handleSubmit} className="space-y-4 mb-8">
				<Input
					type="text"
					name="prompt"
					placeholder="Describe your workout goals..."
					required
				/>
				<div className="flex items-center space-x-4">
					<span>Number of exercises:</span>
					<Slider
						value={[numExercises]}
						onValueChange={(value) => setNumExercises(value[0])}
						max={10}
						step={1}
						className="w-64"
					/>
					<span>{numExercises}</span>
				</div>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Generating..." : "Generate Workout"}
				</Button>
			</form>

			{exercises.length > 0 && (
				<div className="space-y-4">
					{exercises.map((exercise, index) => (
						<Card key={index}>
							<CardHeader>
								<CardTitle>{exercise.name}</CardTitle>
								<CardDescription>{exercise.muscle_group}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{exercise.description}</p>
								<p className="mt-2 text-sm text-gray-500">
									Equipment: {exercise.equipment}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
