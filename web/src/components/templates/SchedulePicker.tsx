"use client"

import type React from "react"

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

interface TimeRange {
  startTime: string
  endTime: string
}

interface SchedulePickerProps {
  selectedDays?: string[]
  timeRange?: TimeRange
  onDaysChange?: (days: string[]) => void
  onTimeRangeChange?: (timeRange: TimeRange) => void
  timeFormat?: "12" | "24"
  className?: string
}

const SchedulePicker = ({
	selectedDays = [],
	timeRange = { startTime: "", endTime: "" },
	onDaysChange,
	onTimeRangeChange,
	timeFormat = "12",
}: SchedulePickerProps) => {
	const [internalSelectedDays, setInternalSelectedDays] = useState<string[]>(selectedDays)
	const [internalTimeRange, setInternalTimeRange] = useState<TimeRange>(timeRange)
	const [startTimeInput, setStartTimeInput] = useState("")
	const [endTimeInput, setEndTimeInput] = useState("")

	const currentSelectedDays = onDaysChange ? selectedDays : internalSelectedDays
	const currentTimeRange = onTimeRangeChange ? timeRange : internalTimeRange
	const setSelectedDays = onDaysChange || setInternalSelectedDays
	const setTimeRange = onTimeRangeChange || setInternalTimeRange

	// Day picker functions
	const toggleDay = (dayKey: string) => {
		const newSelectedDays = currentSelectedDays.includes(dayKey)
			? currentSelectedDays.filter((day) => day !== dayKey)
			: [...currentSelectedDays, dayKey]
		setSelectedDays(newSelectedDays)
	}

	const selectAllDays = () => {
		setSelectedDays(DAYS.map((day) => day.key))
	}

	const clearAllDays = () => {
		setSelectedDays([])
	}

	// Time parsing and formatting functions
	const parseTimeInput = (input: string): string => {
		if (!input.trim()) return ""

		// Remove extra spaces and convert to lowercase for parsing
		const cleanInput = input.trim().toLowerCase()

		// Handle various input formats
		let match

		if (timeFormat === "24") {
			// 24-hour format patterns
			match = cleanInput.match(/^(\d{1,2})(?::(\d{2}))?$/)
			if (match) {
				const hours = Number.parseInt(match[1])
				const minutes = match[2] ? Number.parseInt(match[2]) : 0

				if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
					return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
				}
			}
		} else {
			// 12-hour format patterns
			// Match patterns like: 9, 9am, 9:30, 9:30am, 9:30 am, etc.
			match = cleanInput.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a|p)?$/)
			if (match) {
				const hours = Number.parseInt(match[1])
				const minutes = match[2] ? Number.parseInt(match[2]) : 0
				let period = match[3]

				// Default to AM if no period specified and hour is 1-11, PM if 12
				if (!period) {
					period = hours === 12 ? "pm" : "am"
				}

				// Normalize period
				if (period === "a") period = "am"
				if (period === "p") period = "pm"

				// Validate hours and minutes
				if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
					return `${hours}:${minutes.toString().padStart(2, "0")} ${period.toUpperCase()}`
				}
			}
		}

		return "" // Invalid input
	}

	const updateTimeFromInput = (type: "start" | "end", input: string) => {
		const parsedTime = parseTimeInput(input)
		const newTimeRange = {
			...currentTimeRange,
			[type === "start" ? "startTime" : "endTime"]: parsedTime,
		}
		setTimeRange(newTimeRange)
	}

	const formatDisplayTimeRange = () => {
		const { startTime, endTime } = currentTimeRange
		if (!startTime && !endTime) return "Select time range"
		if (startTime && endTime) return `${startTime} - ${endTime}`
		if (startTime) return `${startTime} - ?`
		return `? - ${endTime}`
	}

	const TimeInput = ({ type, time }: { type: "start" | "end"; time: string }) => {
		const [inputValue, setInputValue] = useState("")
		const [isValid, setIsValid] = useState(true)

		const handleInputChange = (value: string) => {
			setInputValue(value)
			const parsed = parseTimeInput(value)
			setIsValid(value === "" || parsed !== "")
		}

		const handleInputBlur = () => {
			const parsed = parseTimeInput(inputValue)
			if (parsed) {
				updateTimeFromInput(type, inputValue)
				setInputValue("")
			} else if (inputValue.trim() !== "") {
				setIsValid(false)
			}
		}

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				handleInputBlur()
			}
		}

		const placeholder = timeFormat === "12" ? "e.g. 9:00 AM" : "e.g. 09:00"
		const currentDisplayValue = inputValue || time

		return (
			<div className="space-y-2">
				<Label className="text-sm font-medium capitalize">{type} Time</Label>
				<Input
					value={currentDisplayValue}
					onChange={(e) => handleInputChange(e.target.value)}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className={cn("w-full", !isValid && "border-red-500 focus-visible:ring-red-500")}
				/>
				{!isValid && (
					<p className="text-xs text-red-500">
            Invalid time format. {timeFormat === "12" ? "Use format like 9:00 AM" : "Use 24-hour format like 09:00"}
					</p>
				)}
				<p className="text-xs text-muted-foreground">
					{timeFormat === "12" ? "Type time like: 9am, 9:30 AM, 12:00 PM" : "Type time like: 9:00, 14:30, 23:45"}
				</p>
			</div>
		)
	}

	const setCommonTimeRanges = (startTime: string, endTime: string) => {
		setTimeRange({ startTime, endTime })
	}

	return (
		<div className="space-y-6">
			{/* Days Section */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label className="text-base font-medium">Select Days</Label>
					<div className="flex gap-2">
						<Button variant="ghost" size="sm" onClick={selectAllDays} className="h-8 px-2 text-xs">
              Select All
						</Button>
						<Button variant="ghost" size="sm" onClick={clearAllDays} className="h-8 px-2 text-xs">
              Clear
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-7 gap-2">
					{DAYS.map((day) => {
						const isSelected = currentSelectedDays.includes(day.key)
						return (
							<Button
								key={day.key}
								variant={isSelected ? "default" : "outline"}
								size="sm"
								onClick={() => toggleDay(day.key)}
								className={cn("h-12 w-full relative flex flex-col", isSelected && "bg-primary text-primary-foreground")}
							>
								<span className="text-xs font-medium">{day.label}</span>
								{isSelected && <Check className="absolute top-1 right-1 h-3 w-3" />}
							</Button>
						)
					})}
				</div>
			</div>

			<Separator />

			{/* Time Range Section */}
			<div className="space-y-4">
				<Label className="text-base font-medium">Select Time Range</Label>

				{/* Quick Presets */}
				<div className="space-y-2">
					<Label className="text-xs text-muted-foreground">Quick Presets</Label>
					<div className="flex flex-wrap gap-2">
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								setCommonTimeRanges(
									timeFormat === "12" ? "9:00 AM" : "09:00",
									timeFormat === "12" ? "5:00 PM" : "17:00",
								)
							}
						>
              9-5
						</Button>
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								setCommonTimeRanges(
									timeFormat === "12" ? "8:00 AM" : "08:00",
									timeFormat === "12" ? "6:00 PM" : "18:00",
								)
							}
						>
              8-6
						</Button>
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								setCommonTimeRanges(
									timeFormat === "12" ? "10:00 AM" : "10:00",
									timeFormat === "12" ? "2:00 PM" : "14:00",
								)
							}
						>
              10-2
						</Button>
					</div>
				</div>

				{/* Time Input Fields */}
				<div className="grid gap-6 md:grid-cols-2">
					<TimeInput type="start" time={currentTimeRange.startTime} />
					<TimeInput type="end" time={currentTimeRange.endTime} />
				</div>

				{/* <div className="flex gap-2">
					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							setTimeRange({ startTime: "", endTime: "" })
							setStartTimeInput("")
							setEndTimeInput("")
						}}
					>
            Clear Times
					</Button>
				</div> */}
			</div>

			{/* Summary */}
			{(currentSelectedDays.length > 0 || currentTimeRange.startTime || currentTimeRange.endTime) && (
				<>
					<Separator />
					<div className="space-y-2">
						<Label className="text-base font-medium">Schedule Summary</Label>
						<div className="text-sm text-muted-foreground">
							{currentSelectedDays.length > 0 && (currentTimeRange.startTime || currentTimeRange.endTime) ? (
								<>
                  Every {currentSelectedDays.map((dayKey) => DAYS.find((d) => d.key === dayKey)?.full).join(", ")} from{" "}
									{formatDisplayTimeRange()}
								</>
							) : currentSelectedDays.length > 0 ? (
								<>Days: {currentSelectedDays.map((dayKey) => DAYS.find((d) => d.key === dayKey)?.full).join(", ")}</>
							) : currentTimeRange.startTime || currentTimeRange.endTime ? (
								<>Time range: {formatDisplayTimeRange()}</>
							) : null}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default SchedulePicker
