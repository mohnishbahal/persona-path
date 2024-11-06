import React, { useRef } from 'react';
import { Camera, Plus, Minus, X } from 'lucide-react';

interface TouchpointFormProps {
  touchpoint: {
    name: string;
    description: string;
    customerAction: string;
    emotion: 'positive' | 'neutral' | 'negative';
    image?: string;
  };
  onChange: (updates: Partial<TouchpointFormProps['touchpoint']>) => void;
  onRemove: () => void;
}

export function TouchpointForm({ touchpoint, onChange, onRemove }: TouchpointFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Touchpoint Details
        </h3>
        <button
          onClick={onRemove}
          className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Touchpoint Image
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer"
          >
            <div className={`
              aspect-[2/1] rounded-lg overflow-hidden border-2 border-dashed
              ${touchpoint.image 
                ? 'border-transparent' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }
            `}>
              {touchpoint.image ? (
                <>
                  <img 
                    src={touchpoint.image} 
                    alt="Touchpoint visualization" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                      <Camera className="w-12 h-12 text-white mb-2 mx-auto" />
                      <p className="text-white text-sm font-medium text-center">
                        Click to change image
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Click to upload image
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    SVG, PNG, JPG (max. 800×400px)
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Rest of the form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            value={touchpoint.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            placeholder="Name this touchpoint"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            value={touchpoint.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            placeholder="Describe what happens at this touchpoint"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Customer Action
          </label>
          <textarea
            value={touchpoint.customerAction}
            onChange={(e) => onChange({ customerAction: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            placeholder="What action does the customer take?"
          />
        </div>

        {/* Emotion Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer Emotion
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'positive', label: 'Positive', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
              { value: 'neutral', label: 'Neutral', color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' },
              { value: 'negative', label: 'Negative', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' }
            ].map(({ value, label, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ emotion: value as 'positive' | 'neutral' | 'negative' })}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors
                  ${touchpoint.emotion === value
                    ? `${color} border-current`
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }
                `}
              >
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}