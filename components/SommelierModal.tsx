import React, { useEffect, useState } from 'react';
import { X, Wine, Sparkles, Loader2 } from 'lucide-react';
import { getWinePairing } from '../services/geminiService';
import { MenuItem, PairingResponse } from '../types';

interface SommelierModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const SommelierModal: React.FC<SommelierModalProps> = ({ item, onClose }) => {
  const [pairing, setPairing] = useState<PairingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      setLoading(true);
      setPairing(null);
      getWinePairing(item.name, item.description)
        .then(result => {
          setPairing(result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [item]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-primary-800 rounded-lg shadow-2xl overflow-hidden border border-primary-600">
        
        {/* Header */}
        <div className="bg-primary-900 text-white p-4 flex items-center justify-between border-b border-primary-700">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-200" />
            <h3 className="font-serif text-xl italic">AI Sommelier</h3>
          </div>
          <button onClick={onClose} className="text-primary-300 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h4 className="font-serif text-2xl text-white mb-2">{item.name}</h4>
          <p className="text-sm text-primary-300 mb-8 font-sans border-b border-primary-700 pb-4 inline-block px-8">
            Pairing Suggestion
          </p>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <Loader2 className="w-8 h-8 text-primary-300 animate-spin" />
              <p className="text-primary-200 text-sm font-sans italic">Consulting the cellar...</p>
            </div>
          ) : pairing ? (
            <div className="animate-slide-up space-y-4">
              <div className="w-12 h-12 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-600">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-serif text-xl text-primary-100 font-semibold">{pairing.wine}</h5>
              <p className="text-primary-200 font-sans leading-relaxed text-sm">
                {pairing.description}
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="bg-primary-900/50 p-4 text-center border-t border-primary-700">
          <button 
            onClick={onClose}
            className="text-xs uppercase tracking-widest text-primary-400 hover:text-white transition-colors font-sans font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SommelierModal;