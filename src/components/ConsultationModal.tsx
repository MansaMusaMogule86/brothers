import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PrivateMembershipInquiry, MembershipInquiryData } from './PrivateMembershipInquiry';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProtocol?: string;
  onNavigateToDna?: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialProtocol,
  onNavigateToDna,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl my-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-[#969892] hover:text-[#F1EEE8] p-2 bg-[#101110] border border-[#B9A17B]/30 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <PrivateMembershipInquiry
          isModal={true}
          onSuccess={(inquiry, dossierId) => {
            // Can persist or notify
          }}
          onNavigateToDna={() => {
            onClose();
            if (onNavigateToDna) {
              onNavigateToDna();
            }
          }}
        />
      </motion.div>
    </div>
  );
};
