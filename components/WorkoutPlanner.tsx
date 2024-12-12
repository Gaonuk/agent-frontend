"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import WorkoutResult from "./WorkoutResult";

const equipmentOptions = [
	"Dumbbell",
	"Barbell",
	"Kettlebell",
	"Resistance Bands",
	"Bodyweight",
];
const bodyPartOptions = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

export default function WorkoutPlanner() {
	const [workoutData, setWorkoutData] = useState(null);
	const [numExercises, setNumExercises] = useState(3);
	const [availableEquipment, setAvailableEquipment] = useState(["Dumbbell"]);
	const [experienceLevel, setExperienceLevel] = useState("Intermediate");
	const [intensity, setIntensity] = useState("heavy");
	const [targetBodyParts, setTargetBodyParts] = useState(["Chest"]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const prompt = e.currentTarget.prompt.value;
		try {
			const response = await fetch("/api/generate-workout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt,
					available_equipment: availableEquipment,
					experience_level: experienceLevel,
					intensity,
					target_body_parts: targetBodyParts,
					num_exercises: numExercises,
					format_style: "detailed",
				}),
			});
			const data = await response.json();
			setWorkoutData(data);
		} catch (error) {
			console.error("Error fetching workout data:", error);
		}
		setIsLoading(false);
	};

	const handleBack = () => {
		setWorkoutData(null);
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			{!workoutData ? (
				<Card>
					<CardContent className="pt-6">
						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								type="text"
								name="prompt"
								placeholder="Describe your workout goals..."
								required
							/>
							<div className="space-y-2">
								<label
									htmlFor="available-equipment"
									className="text-sm font-medium"
								>
									Available Equipment:
								</label>
								<div className="flex flex-wrap gap-2">
									{equipmentOptions.map((equipment) => (
										<div
											key={equipment}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={equipment}
												checked={availableEquipment.includes(equipment)}
												onCheckedChange={(checked) => {
													if (checked) {
														setAvailableEquipment([
															...availableEquipment,
															equipment,
														]);
													} else {
														setAvailableEquipment(
															availableEquipment.filter((e) => e !== equipment),
														);
													}
												}}
											/>
											<label htmlFor={equipment}>{equipment}</label>
										</div>
									))}
								</div>
							</div>
							<Select
								value={experienceLevel}
								onValueChange={setExperienceLevel}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select experience level" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Beginner">Beginner</SelectItem>
									<SelectItem value="Intermediate">Intermediate</SelectItem>
									<SelectItem value="Advanced">Advanced</SelectItem>
								</SelectContent>
							</Select>
							<Select value={intensity} onValueChange={setIntensity}>
								<SelectTrigger>
									<SelectValue placeholder="Select intensity" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="moderate">Moderate</SelectItem>
									<SelectItem value="heavy">Heavy</SelectItem>
								</SelectContent>
							</Select>
							<div className="space-y-2">
								<label
									htmlFor="target-body-parts"
									className="text-sm font-medium"
								>
									Target Body Parts:
								</label>
								<div className="flex flex-wrap gap-2">
									{bodyPartOptions.map((bodyPart) => (
										<div key={bodyPart} className="flex items-center space-x-2">
											<Checkbox
												id={bodyPart}
												checked={targetBodyParts.includes(bodyPart)}
												onCheckedChange={(checked) => {
													if (checked) {
														setTargetBodyParts([...targetBodyParts, bodyPart]);
													} else {
														setTargetBodyParts(
															targetBodyParts.filter((bp) => bp !== bodyPart),
														);
													}
												}}
											/>
											<label htmlFor={bodyPart}>{bodyPart}</label>
										</div>
									))}
								</div>
							</div>
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
					</CardContent>
				</Card>
			) : (
				<WorkoutResult workoutData={workoutData} onBack={handleBack} />
			)}
		</div>
	);
}
