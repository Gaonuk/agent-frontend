export const getRatingColor = (rating: number) => {
	if (rating >= 9) return "text-green-500";
	if (rating >= 7) return "text-blue-500";
	if (rating >= 5) return "text-yellow-500";
	return "text-red-500";
};

export const getDifficultyColor = (level: string) => {
	switch (level.toLowerCase()) {
		case "beginner":
			return "text-green-500";
		case "intermediate":
			return "text-yellow-500";
		case "advanced":
			return "text-red-500";
		default:
			return "text-gray-500";
	}
};
