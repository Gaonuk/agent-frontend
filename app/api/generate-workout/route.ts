import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const response = await fetch(`${API_URL}/recommend-workout-formatted`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();

	return NextResponse.json(data);
}
