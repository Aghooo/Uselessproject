import { useState } from "react";
import { motion } from "framer-motion";
import { Printer } from "@/components/printer";
import { FileUploadModal } from "@/components/file-upload-modal";
import { Bill } from "@/components/bill";
import { AnimatedPaper } from "@/components/animated-paper";

export default function Home() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPaperAnimation, setShowPaperAnimation] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [printJobData, setPrintJobData] = useState<any>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrinterClick = () => {
    setShowUploadModal(true);
  };

  const handleUploadSuccess = (data: any) => {
    setShowUploadModal(false);
    setPrintJobData(data);
    setIsPrinting(true);
    setShowPaperAnimation(true);
    
    // Hide paper animation and stop printing after 3 seconds, then show bill
    setTimeout(() => {
      setShowPaperAnimation(false);
      setIsPrinting(false);
      setShowBill(true);
    }, 3000);
  };

  const handleCloseBill = () => {
    setShowBill(false);
    setPrintJobData(null);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Beautiful Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            ✨ PrintMagic ✨
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium mb-3">
            Where every print becomes magical
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {["🖨️", "📄", "✨", "🧾", "💫"].map((emoji, index) => (
                <motion.span
                  key={index}
                  className="text-xl"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <Printer onClick={handlePrinterClick} isPrinting={isPrinting} />
          </motion.div>
          
          
          {isPrinting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl p-4 shadow-lg backdrop-blur-sm"
            >
              <p className="text-yellow-800 text-lg font-bold">🖨️ PRINTING IN PROGRESS...</p>
              <p className="text-yellow-600 text-sm mt-1">Please wait while your files are being printed</p>
            </motion.div>
          )}
        </div>

        {showPaperAnimation && <AnimatedPaper />}
      </div>

      <FileUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <Bill
        isOpen={showBill}
        onClose={handleCloseBill}
        printJobData={printJobData}
      />
    </div>
  );
}
