import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
	const { prompt, numExercises } = await req.json();

	const response = await fetch("http://localhost:8000/generate_workout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ prompt, num_exercises: numExercises }),
	});

	const data = await response.json();

	return NextResponse.json(data);
}
