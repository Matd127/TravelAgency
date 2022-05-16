import { DepartureCity } from "./DepartureCity"
import { Hotel } from "./Hotel"

export class Travel{
    id?: number
    name: string
    content: string
    isLastMinute: boolean
    destination: string
    price: number
    travel_date: Date
    return_date: Date
    departureCity: DepartureCity
    hotel: Hotel
}