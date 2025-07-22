"use client"

import { useState } from "react"
import { Check, Clock } from "lucide-react"
import { cn } from "@/utils/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
	className,
}: SchedulePickerProps) => {
	const [internalSelectedDays, setInternalSelectedDays] = useState<string[]>(selectedDays)
	const [internalTimeRange, setInternalTimeRange] = useState<TimeRange>(timeRange)
	const [timePickerOpen, setTimePickerOpen] = useState(false)

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

	// Time picker functions
	const parseTime = (timeStr: string) => {
		if (!timeStr) return { hours: "12", minutes: "00", period: "AM" }

		if (timeFormat === "24") {
			const [hours, minutes] = timeStr.split(":")
			return { hours: hours || "00", minutes: minutes || "00", period: "" }
		} else {
			const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
			if (match) {
				return { hours: match[1], minutes: match[2], period: match[3].toUpperCase() }
			}
			return { hours: "12", minutes: "00", period: "AM" }
		}
	}

	const updateTime = (type: "start" | "end", newHours: string, newMinutes: string, newPeriod: string) => {
		let formattedTime: string
		if (timeFormat === "24") {
			formattedTime = `${newHours.padStart(2, "0")}:${newMinutes.padStart(2, "0")}`
		} else {
			formattedTime = `${newHours}:${newMinutes.padStart(2, "0")} ${newPeriod}`
		}

		const newTimeRange = {
			...currentTimeRange,
			[type === "start" ? "startTime" : "endTime"]: formattedTime,
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

	// Generate options
	const hourOptions =
    timeFormat === "24"
    	? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
    	: Array.from({ length: 12 }, (_, i) => (i + 1).toString())

	const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

	const TimeSelector = ({ type, time }: { type: "start" | "end"; time: string }) => {
		const { hours, minutes, period } = parseTime(time)

		return (
			<div className="space-y-3">
				<Label className="text-sm font-medium capitalize">{type} Time</Label>
				<div className="flex items-center gap-2">
					{/* Hours */}
					<div className="space-y-1">
						<Label className="text-xs text-muted-foreground">Hours</Label>
						<Select value={hours} onValueChange={(value) => updateTime(type, value, minutes, period)}>
							<SelectTrigger className="w-16">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{hourOptions.map((hour) => (
									<SelectItem key={hour} value={hour}>
										{hour}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="pt-5">:</div>

					{/* Minutes */}
					<div className="space-y-1">
						<Label className="text-xs text-muted-foreground">Minutes</Label>
						<Select value={minutes} onValueChange={(value) => updateTime(type, hours, value, period)}>
							<SelectTrigger className="w-16">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{minuteOptions
									.filter((_, i) => i % 15 === 0)
									.map((minute) => (
										<SelectItem key={minute} value={minute}>
											{minute}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>

					{/* AM/PM for 12-hour format */}
					{timeFormat === "12" && (
						<>
							<div className="pt-5 px-1"></div>
							<div className="space-y-1">
								<Label className="text-xs text-muted-foreground">Period</Label>
								<Select value={period} onValueChange={(value) => updateTime(type, hours, minutes, value)}>
									<SelectTrigger className="w-16">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="AM">AM</SelectItem>
										<SelectItem value="PM">PM</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</>
					)}
				</div>
			</div>
		)
	}

	const setCommonTimeRanges = (startTime: string, endTime: string) => {
		setTimeRange({ startTime, endTime })
	}

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader>
				<CardTitle>Schedule Picker</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
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
									className={cn(
										"h-12 w-full relative flex flex-col",
										isSelected && "bg-primary text-primary-foreground",
									)}
								>
									<span className="text-xs font-medium">{day.label}</span>
									{isSelected && <Check className="absolute top-1 right-1 h-3 w-3" />}
								</Button>
							)
						})}
					</div>

					{currentSelectedDays.length > 0 && (
						<div className="text-sm text-muted-foreground">
              Selected: {currentSelectedDays.map((dayKey) => DAYS.find((d) => d.key === dayKey)?.full).join(", ")}
						</div>
					)}
				</div>

				<Separator />

				{/* Time Range Section */}
				<div className="space-y-4">
					<Label className="text-base font-medium">Select Time Range</Label>

					<Popover open={timePickerOpen} onOpenChange={setTimePickerOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"w-full justify-start text-left font-normal h-12",
									!currentTimeRange.startTime && !currentTimeRange.endTime && "text-muted-foreground",
								)}
							>
								<Clock className="mr-2 h-4 w-4" />
								{formatDisplayTimeRange()}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-4" align="start">
							<div className="space-y-6">
								<div className="text-sm font-medium">Select Time Range</div>

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

								<Separator />

								{/* Time Selectors */}
								<div className="grid gap-6 md:grid-cols-2">
									<TimeSelector type="start" time={currentTimeRange.startTime} />
									<TimeSelector type="end" time={currentTimeRange.endTime} />
								</div>

								<div className="flex gap-2">
									<Button size="sm" variant="outline" onClick={() => setTimeRange({ startTime: "", endTime: "" })}>
                    Clear
									</Button>
									<Button size="sm" onClick={() => setTimePickerOpen(false)}>
                    Done
									</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>

					{(currentTimeRange.startTime || currentTimeRange.endTime) && (
						<div className="text-sm text-muted-foreground">Selected range: {formatDisplayTimeRange()}</div>
					)}
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
                    Every {currentSelectedDays.map((dayKey) => DAYS.find((d) => d.key === dayKey)?.full).join(", ")}{" "}
                    from {formatDisplayTimeRange()}
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
			</CardContent>
		</Card>
	)
}

export default SchedulePicker