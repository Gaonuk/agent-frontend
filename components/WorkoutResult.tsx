"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRatingColor, getDifficultyColor } from "../utils/colors";

interface Exercise {
	Title: string;
	Desc: string;
	Type: string;
	BodyPart: string;
	Equipment: string;
	Level: string;
	Rating: number;
	RatingDesc: string;
}

interface WorkoutData {
	answer: string;
	exercises: Exercise[];
}

interface WorkoutResultProps {
	workoutData: WorkoutData;
	onBack: () => void;
}

export default function WorkoutResult({
	workoutData,
	onBack,
}: WorkoutResultProps) {
	const [currentPage, setCurrentPage] = useState(0);

	// Split the markdown content into pages based on headers
	const pages = workoutData.answer
		.split("\n\n**")
		.filter((page) => page.trim().length > 0);

	const nextPage = () => {
		if (currentPage < pages.length - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<Button variant="outline" onClick={onBack}>
					<ChevronLeft className="mr-2 h-4 w-4" /> Back to Form
				</Button>
				<span className="text-sm text-muted-foreground">Workout Plan</span>
			</div>

			<Tabs defaultValue="plan" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="plan">Workout Plan</TabsTrigger>
					<TabsTrigger value="exercises">Exercises</TabsTrigger>
				</TabsList>

				<TabsContent value="plan">
					<Card>
						<CardContent className="pt-6">
							<div className="min-h-[400px]">
								<ReactMarkdown className="prose max-w-none">
									{`**${pages[currentPage]}`}
								</ReactMarkdown>
							</div>
							<div className="flex justify-between items-center mt-4">
								<Button
									variant="outline"
									onClick={prevPage}
									disabled={currentPage === 0}
								>
									<ChevronLeft className="mr-2 h-4 w-4" /> Previous
								</Button>
								<span className="text-sm text-muted-foreground">
									{currentPage + 1} / {pages.length}
								</span>
								<Button
									variant="outline"
									onClick={nextPage}
									disabled={currentPage === pages.length - 1}
								>
									Next <ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="exercises">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{workoutData.exercises.map((exercise) => (
							<Card key={exercise.Title}>
								<CardHeader>
									<CardTitle>{exercise.Title}</CardTitle>
									<CardDescription>
										{exercise.BodyPart} - {exercise.Type}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="mb-4">{exercise.Desc}</p>
									<div className="grid grid-cols-2 gap-2 text-sm">
										<div>Equipment: {exercise.Equipment}</div>
										<div>
											Level:{" "}
											<span className={getDifficultyColor(exercise.Level)}>
												{exercise.Level}
											</span>
										</div>
										<div>
											Rating:{" "}
											<span className={getRatingColor(exercise.Rating)}>
												{exercise.Rating}/10
											</span>
										</div>
										<div>Rating Description: {exercise.RatingDesc}</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
