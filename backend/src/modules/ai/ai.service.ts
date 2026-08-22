import { AIRecommendation, VehicleKnowledgeItem } from './ai.types';

export class AIService {
  private knowledge: VehicleKnowledgeItem[] = [];

  addKnowledge(item: VehicleKnowledgeItem) {
    this.knowledge.push(item);
    return item;
  }

  recommend(vehicleId: string): AIRecommendation {
    const context = this.knowledge.filter(k => k.vehicleId === vehicleId);

    return {
      vehicleId,
      recommendation: context.length
        ? 'Analizar historial y programar mantenimiento preventivo.'
        : 'Recopilar información inicial del vehículo.',
      confidence: context.length ? 0.7 : 0.3,
    };
  }
}

export const aiService = new AIService();
