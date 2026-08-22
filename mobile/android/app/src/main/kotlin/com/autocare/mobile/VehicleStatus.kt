package com.autocare.mobile

/**
 * Modelo inicial para Android Auto.
 */
data class VehicleStatus(
    val vehicleName: String,
    val healthScore: Int,
    val nextMaintenance: String,
    val alerts: Int
)
