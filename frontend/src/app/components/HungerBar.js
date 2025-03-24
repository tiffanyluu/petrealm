/**
 * Displays the pet's hunger level as a colored progress bar. 
 * Green = full, yellow = moderate, red = low.
 */

export default function HungerBar({ hunger }) {
    const barWidth = `${hunger}%`;
    const getBarColor = () => {
        if (hunger > 70) return "bg-green-500";
        if (hunger > 30) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="w-full bg-gray-200 rounded-md h-4">
            <div
                className={`h-full rounded-md ${getBarColor()}`}
                style={{ width: barWidth }}
            ></div>
        </div>
    )
}