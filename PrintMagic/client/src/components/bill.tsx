import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BillProps {
  isOpen: boolean;
  onClose: () => void;
  printJobData: any;
}

export function Bill({ isOpen, onClose, printJobData }: BillProps) {
  const [tearLines, setTearLines] = useState<Array<{ id: string; y: number }>>([]);
  const [isDragging, setIsDragging] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !printJobData) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    createTearLine(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    createTearLine(e.touches[0].clientY);
  };

  const createTearLine = (clientY: number) => {
    if (!billRef.current) return;
    
    const billRect = billRef.current.getBoundingClientRect();
    const relativeY = clientY - billRect.top;
    
    if (relativeY > 0 && relativeY < billRect.height) {
      const newTearLine = {
        id: Math.random().toString(36),
        y: relativeY
      };
      setTearLines(prev => [...prev, newTearLine]);
      
      // Add shake effect
      setTimeout(() => {
        if (billRef.current) {
          billRef.current.style.transform = `translateY(${Math.random() * 10 - 5}px) rotate(${Math.random() * 4 - 2}deg)`;
        }
      }, 300);
    }
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative">
        <motion.div
          ref={billRef}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bill-paper bg-white w-80 rounded-lg shadow-2xl relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ userSelect: 'none' }}
        >
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 text-center">
            <h2 className="text-xl font-bold">PRINT RECEIPT</h2>
            <p className="text-indigo-200 text-sm">Thank you for printing with us!</p>
          </div>
          
          {/* Bill Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Receipt #</span>
              <span className="font-mono font-bold">{printJobData.printJob.receiptNumber}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Date</span>
              <span>{formatDate()}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Files Printed</span>
              <span>{printJobData.fileCount}</span>
            </div>
            
            <hr className="my-4" />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-indigo-600">₹{printJobData.printJob.price}</span>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Drag anywhere on this bill to tear it!</p>
            </div>
          </div>
          
          {/* Tear Lines */}
          {tearLines.map((tearLine) => (
            <motion.div
              key={tearLine.id}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              style={{ top: tearLine.y }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>
        
        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 p-0"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
