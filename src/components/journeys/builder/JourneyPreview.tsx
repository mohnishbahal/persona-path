import React from 'react';
import { Smile, Meh, Frown, ChevronRight } from 'lucide-react';
import { Journey } from '../../../types/journey';
import { useApp } from '../../../context/AppContext';

interface JourneyPreviewProps {
  journey: Journey;
}

export function JourneyPreview({ journey }: JourneyPreviewProps) {
  const { personas } = useApp();
  const associatedPersonas = personas.filter(p => journey.personaIds.includes(p.id));

  const getEmotionIcon = (emotion: 'positive' | 'neutral' | 'negative') => {
    switch (emotion) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-400" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-400" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getEmotionColor = (emotion: 'positive' | 'neutral' | 'negative') => {
    switch (emotion) {
      case 'positive':
        return 'bg-green-500/10 border-green-500/20';
      case 'negative':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-yellow-500/10 border-yellow-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Journey Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">{journey.name}</h2>
          <p className="text-gray-400">{journey.description}</p>
        </div>
        <div className="flex -space-x-2">
          {associatedPersonas.map((persona) => (
            <img
              key={persona.id}
              src={persona.avatar}
              alt={persona.name}
              className="w-8 h-8 rounded-full border-2 border-dark-surface"
              title={persona.name}
            />
          ))}
        </div>
      </div>

      {/* Journey Stages */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-dark-border -translate-y-1/2" />
        
        <div className="relative flex justify-between">
          {journey.stages.map((stage, stageIndex) => (
            <div key={stage.id} className="relative flex-1 px-4">
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">{stage.name}</div>
                <div className="space-y-4">
                  {stage.touchpoints.map((touchpoint, touchpointIndex) => (
                    <div
                      key={touchpoint.id}
                      className={`relative p-4 rounded-lg border ${getEmotionColor(touchpoint.emotion)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">
                          {touchpoint.name}
                        </h4>
                        {getEmotionIcon(touchpoint.emotion)}
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        {touchpoint.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Satisfaction
                          </div>
                          <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${touchpoint.metrics.satisfaction}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Effort
                          </div>
                          <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${touchpoint.metrics.effort}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Completion
                          </div>
                          <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${touchpoint.metrics.completion}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {stageIndex < journey.stages.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-1 rounded-full bg-dark-surface border border-dark-border">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}