package com.autocare.mobile

/**
 * Android Auto vehicle summary screen foundation.
 * Displays safe driving information only.
 */

class AndroidAutoVehicleScreen {
    fun buildSummary(status: VehicleStatus): String {
        return """
            AUTOCARE
            ${status.vehicleName}
            Estado: ${status.healthScore}/100
            Próximo mantenimiento: ${status.nextMaintenance}
            Alertas: ${status.alertCount}
        """.trimIndent()
    }
}
