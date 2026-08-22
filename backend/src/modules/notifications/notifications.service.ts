import { NotificationPriority, NotificationStatus } from './notifications.types';

export class NotificationsService {
  create(vehicleId: string, title: string, message: string, priority = NotificationPriority.MEDIUM) {
    return {
      id: crypto.randomUUID(),
      vehicleId,
      title,
      message,
      priority,
      status: NotificationStatus.UNREAD,
      createdAt: new Date(),
    };
  }

  maintenanceReminder(vehicleId: string, item: string) {
    return this.create(
      vehicleId,
      'Mantenimiento pendiente',
      `Revisar: ${item}`,
      NotificationPriority.HIGH,
    );
  }
}

export const notificationsService = new NotificationsService();
