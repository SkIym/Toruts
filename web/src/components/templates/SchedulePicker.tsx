"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/utils/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const DAYS = [
	{ key: "monday", label: "Mon", full: "Monday" },
	{ key: "tuesday", label: "Tue", full: "Tuesday" },
	{ key: "wednesday", label: "Wed", full: "Wednesday" },
	{ key: "thursday", label: "Thu", full: "Thursday" },
	{ key: "friday", label: "Fri", full: "Friday" },
	{ key: "saturday", label: "Sat", full: "Saturday" },
	{ key: "sunday", label: "Sun", full: "Sunday" },
]

interface SchedulePickerProps {
  value?: string
  onChange?: (val: string) => void
  timeFormat?: "12" | "24"
}

const SchedulePicker = ({
	value = "",
	onChange,
	timeFormat = "12",
}: SchedulePickerProps) => {
	// --- Parse the string value ---
	const [daysPart, timePart] = value.split("|")
	const selectedDays = daysPart ? daysPart.split(",").filter(Boolean) : []
	const [startTime, endTime] = timePart ? timePart.split("-") : ["", ""]

	const updateValue = (days: string[], start: string, end: string) => {
		const daysStr = days.join(",")
		const timeStr = start || end ? `${start}-${end}` : ""
		const newValue = daysStr || timeStr ? `${daysStr}|${timeStr}` : ""
		onChange?.(newValue)
	}

	// --- Toggle day selection ---
	const toggleDay = (dayKey: string) => {
		const newDays = selectedDays.includes(dayKey)
			? selectedDays.filter((d) => d !== dayKey)
			: [...selectedDays, dayKey]
		updateValue(newDays, startTime, endTime)
    	console.log(value)
	}

	// --- Time parsing ---
	const parseTimeInput = (input: string): string => {
		if (!input.trim()) return ""
		const cleanInput = input.trim().toLowerCase()
		let match

		if (timeFormat === "24") {
			match = cleanInput.match(/^(\d{1,2})(?::(\d{2}))?$/)
			if (match) {
				const hours = Number(match[1])
				const minutes = match[2] ? Number(match[2]) : 0
				if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
					return `${hours.toString().padStart(2, "0")}:${minutes
						.toString()
						.padStart(2, "0")}`
				}
			}
		} else {
			match = cleanInput.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a|p)?$/)
			if (match) {
				const hours = Number(match[1])
				const minutes = match[2] ? Number(match[2]) : 0
				let period = match[3]
				if (!period) period = hours === 12 ? "pm" : "am"
				if (period === "a") period = "am"
				if (period === "p") period = "pm"
				if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
					return `${hours}:${minutes.toString().padStart(2, "0")} ${period.toUpperCase()}`
				}
			}
		}
		return ""
	}

	const updateTime = (type: "start" | "end", input: string) => {
		const parsed = parseTimeInput(input)
		updateValue(
			selectedDays,
			type === "start" ? parsed : startTime,
			type === "end" ? parsed : endTime
		)
	}

	const formatDisplayTimeRange = () => {
		if (!startTime && !endTime) return "Select time range"
		if (startTime && endTime) return `${startTime} - ${endTime}`
		if (startTime) return `${startTime} - ?`
		return `? - ${endTime}`
	}

	// --- Time input component ---
	const TimeInput = ({ type, time }: { type: "start" | "end"; time: string }) => {
		const [inputValue, setInputValue] = useState("")
		const [isValid, setIsValid] = useState(true)

		const handleInputChange = (val: string) => {
			setInputValue(val)
			const parsed = parseTimeInput(val)
			setIsValid(val === "" || parsed !== "")
		}

		const handleInputBlur = () => {
			const parsed = parseTimeInput(inputValue)
			if (parsed) {
				updateTime(type, inputValue)
				setInputValue("")
			} else if (inputValue.trim() !== "") {
				setIsValid(false)
			}
		}

		return (
			<div className="space-y-2">
				<Label className="text-xs font-medium capitalize">{type} Time</Label>
				<Input
					value={inputValue || time}
					onChange={(e) => handleInputChange(e.target.value)}
					onBlur={handleInputBlur}
					onKeyDown={(e) => e.key === "Enter" && handleInputBlur()}
					placeholder={timeFormat === "12" ? "e.g. 9:00 AM" : "e.g. 09:00"}
					className={cn("w-full", !isValid && "border-red-500 focus-visible:ring-red-500")}
				/>
				{!isValid && (
					<p className="text-xs text-red-500">
            Invalid time format.{" "}
						{timeFormat === "12"
							? "Use format like 9:00 AM"
							: "Use 24-hour format like 09:00"}
					</p>
				)}
			</div>
		)
	}

	return (
		<div className="space-y-6 bg-gray-50 p-5 rounded-sm">
			<Separator />

			{/* Days */}
			<div className="grid grid-cols-7 gap-2">
				{DAYS.map((day) => {
					const isSelected = selectedDays.includes(day.key)
					return (
						<Button
							key={day.key}
							variant={isSelected ? "default" : "outline"}
							size="sm"
							type="button"
							onClick={() => toggleDay(day.key)}
							className={cn(
								"h-12 w-full relative flex flex-col",
								isSelected && "bg-primary text-primary-foreground"
							)}
						>
							<span className="text-xs font-medium">{day.label}</span>
							{isSelected && <Check className="absolute top-1 right-1 h-3 w-3" />}
						</Button>
					)
				})}
			</div>

			{/* Time Inputs */}
			<div className="grid gap-6 md:grid-cols-2">
				<TimeInput type="start" time={startTime} />
				<TimeInput type="end" time={endTime} />
			</div>

			{/* Summary */}
			{(selectedDays.length > 0 || startTime || endTime) && (
				<div className="space-y-2">
					<Label className="text-base font-medium">Schedule Summary</Label>
					<div className="text-sm text-muted-foreground">
						{selectedDays.length > 0 && (startTime || endTime) ? (
							<>
                Every{" "}
								{selectedDays
									.map((dayKey) => DAYS.find((d) => d.key === dayKey)?.full)
									.join(", ")}{" "}
                from {formatDisplayTimeRange()}
							</>
						) : selectedDays.length > 0 ? (
							<>Days: {selectedDays.map((d) => DAYS.find((dd) => dd.key === d)?.full).join(", ")}</>
						) : startTime || endTime ? (
							<>Time range: {formatDisplayTimeRange()}</>
						) : null}
					</div>
				</div>
			)}

			<Separator />
		</div>
	)
}

export default SchedulePicker
