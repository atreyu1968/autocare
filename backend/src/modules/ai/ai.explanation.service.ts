import { AIContext } from './ai.types';

export interface AIExplanation {
  message: string;
  reasons: string[];
  confidence: number;
}

export class AIExplanationService {
  explain(context: AIContext): AIExplanation {
    const reasons: string[] = [];

    if (context.alerts?.length) {
      reasons.push('Existen alertas activas asociadas al vehículo');
    }

    if (context.documents?.length) {
      reasons.push('La recomendación utiliza documentación disponible');
    }

    return {
      message: 'Recomendación generada a partir del historial disponible del vehículo.',
      reasons,
      confidence: reasons.length ? 0.8 : 0.5,
    };
  }
}

export const aiExplanationService = new AIExplanationService();
