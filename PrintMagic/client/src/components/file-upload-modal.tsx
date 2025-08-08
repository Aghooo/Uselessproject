import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (data: any) => void;
}

export function FileUploadModal({ isOpen, onClose, onUploadSuccess }: FileUploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      setIsPrinting(true);
      
      // Simulate printing process
      setTimeout(() => {
        const mockPrintJob = {
          printJob: {
            id: Math.random().toString(36),
            fileName: selectedFiles.map(f => f.name).join(', '),
            fileSize: selectedFiles.reduce((sum, f) => sum + f.size, 0),
            price: Math.floor(Math.random() * 190) + 10, // Random price 10-200 rupees
            receiptNumber: `PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
            createdAt: new Date()
          },
          fileCount: selectedFiles.length
        };
        
        toast({
          title: "Print Complete!",
          description: `${selectedFiles.length} file(s) printed successfully.`,
        });
        
        onUploadSuccess(mockPrintJob);
        setSelectedFiles([]);
        setIsPrinting(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md mx-4 p-0">
        <DialogTitle className="sr-only">Upload Files for Printing</DialogTitle>
        <DialogDescription className="sr-only">Select files to upload and print</DialogDescription>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Files</h3>
            <p className="text-gray-600 mb-6">Select the files you want to print</p>
            
            {/* File Upload Area */}
            <div
              className="border-2 border-dashed border-indigo-300 rounded-xl p-8 mb-6 hover:border-indigo-400 transition-colors cursor-pointer bg-indigo-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="text-center">
                <File className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                <p className="text-indigo-600 font-medium">Drop files here or click to browse</p>
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG</p>
              </div>
            </div>
            
            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Files:</h4>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isPrinting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                className="flex-1"
                disabled={selectedFiles.length === 0 || isPrinting}
              >
                {isPrinting ? "Printing..." : "Start Printing"}
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
