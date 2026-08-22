package com.autocare.mobile

object VoiceCommands {
    const val VEHICLE_STATUS = "vehicle_status"
    const val NEXT_MAINTENANCE = "next_maintenance"
    const val ALERTS = "alerts"

    fun supportedCommands(): List<String> {
        return listOf(
            VEHICLE_STATUS,
            NEXT_MAINTENANCE,
            ALERTS
        )
    }
}
