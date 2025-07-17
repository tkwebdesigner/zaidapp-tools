'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Upload, Download, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ConversionOption {
  label: string;
  value: string;
  description: string;
}

interface SelectedFile {
  file: File;
  previewUrl: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  error?: string;
}

const conversionOptions: ConversionOption[] = [
  {
    label: 'JPG to PNG',
    value: 'jpg-to-png',
    description: 'Convert JPG images to PNG format with transparency support',
  },
  {
    label: 'PNG to JPG',
    value: 'png-to-jpg',
    description: 'Convert PNG images to JPG format for better compression',
  },
  {
    label: 'JPG to WEBP',
    value: 'jpg-to-webp',
    description: 'Convert JPG images to modern WEBP format for better performance',
  },
  {
    label: 'PNG to WEBP',
    value: 'png-to-webp',
    description: 'Convert PNG images to WEBP format while maintaining quality',
  },
];

export function ImageConverter() {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [conversionType, setConversionType] = useState<string>('jpg-to-png');
  const [isConverting, setIsConverting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const [fromFormat] = conversionType.split('-to-');
    const newFiles: SelectedFile[] = [];

    Array.from(files).forEach(file => {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB`);
        return;
      }

      // Validate file type
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = fromFormat === 'jpg' ? ['jpg', 'jpeg'] : [fromFormat];
      
      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        toast.error(`File ${file.name} is not a valid ${fromFormat.toUpperCase()} file. Expected: ${validExtensions.join(', ').toUpperCase()}`);
        return;
      }

      newFiles.push({
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending'
      });
    });

    setSelectedFiles(prev => [...prev, ...newFiles]);
  }, [conversionType]);

  const handleReset = () => {
    // Cleanup object URLs
    selectedFiles.forEach(file => {
      URL.revokeObjectURL(file.previewUrl);
    });
    setSelectedFiles([]);
    setIsConverting(false);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(selectedFiles[index].previewUrl);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertFile = async (file: SelectedFile) => {
    try {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('conversionType', conversionType);

      const response = await fetch('/api/convert-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Conversion failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted-${file.file.name.split('.')[0]}.${conversionType.split('-to-')[1]}`;
      document.body.appendChild(a);
      a.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      return { status: 'completed' as const };
    } catch (error) {
      console.error('Conversion error:', error);
      return { 
        status: 'error' as const, 
        error: error instanceof Error ? error.message : 'Conversion failed' 
      };
    }
  };

  const handleConversion = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setIsConverting(true);
    const results = await Promise.all(
      selectedFiles.map(async (file, index) => {
        setSelectedFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: 'converting' } : f
        ));
        
        const result = await convertFile(file);
        
        setSelectedFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, ...result } : f
        ));
        
        return result;
      })
    );

    const successCount = results.filter(r => r.status === 'completed').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    if (successCount > 0) {
      toast.success(`Successfully converted ${successCount} image${successCount > 1 ? 's' : ''}`);
    }
    if (errorCount > 0) {
      toast.error(`Failed to convert ${errorCount} image${errorCount > 1 ? 's' : ''}`);
    }

    setIsConverting(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    setDragActive(false);
  };

  return (
    <div className="w-full mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      <motion.div
        className="p-4 sm:p-6 rounded-2xl shadow-xl bg-card/80 backdrop-blur-md border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label className="text-sm sm:text-base font-semibold">Select Conversion Type</Label>
            <Tabs value={conversionType} onValueChange={setConversionType} className="w-full">
              <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">
                {conversionOptions.map(option => (
                  <TabsTrigger key={option.value} value={option.value} className="truncate">
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {conversionOptions.map(option => (
                <TabsContent key={option.value} value={option.value}>
                  <div className="text-sm text-muted-foreground mt-2 mb-4">{option.description}</div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="space-y-2">
            <Label className="text-sm sm:text-base font-semibold">Upload Images</Label>
            <div className="flex flex-col items-center justify-center w-full">
              <motion.label
                htmlFor="dropzone-file"
                className={
                  `flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-dashed rounded-xl cursor-pointer bg-muted hover:bg-muted/80 transition-colors relative overflow-hidden ${dragActive ? 'border-primary bg-primary/10 animate-pulse' : 'border-border'}`
                }
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                tabIndex={0}
                aria-label="Upload images"
              >
                <motion.div
                  className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center"
                  initial={{ scale: 1 }}
                  animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Upload className={`w-10 h-10 mb-2 ${dragActive ? 'text-primary animate-bounce' : 'text-muted-foreground'}`} />
                  <p className="mb-2 text-sm text-muted-foreground font-medium">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {conversionType.split('-to-')[0].toUpperCase()} files only (max 10MB)
                  </p>
                </motion.div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept={`image/${conversionType.split('-to-')[0] === 'jpg' ? 'jpeg' : conversionType.split('-to-')[0]}, image/${conversionType.split('-to-')[0]}`}
                  onChange={handleFileSelect}
                  multiple
                />
              </motion.label>
            </div>

            <AnimatePresence>
              {selectedFiles.length > 0 && (
                <motion.div
                  className="mt-4 space-y-2 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between items-center">
                    <Label className="text-sm sm:text-base font-semibold">Selected Files</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-destructive hover:text-destructive h-8 sm:h-9"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Reset All</span>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        className="relative group rounded-xl shadow-md bg-card border border-border overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden border">
                          <AnimatePresence>
                            {file.status === 'converting' ? (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <Loader2 className="w-8 h-8 animate-spin text-foreground" />
                              </motion.div>
                            ) : file.status === 'error' ? (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-destructive/70 z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <p className="text-destructive-foreground text-xs sm:text-sm text-center px-2">{file.error}</p>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                          <AnimatePresence>
                            {file.status === 'pending' && (
                              <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-muted z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <Skeleton className="w-16 h-16 rounded-full" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <Image
                            src={file.previewUrl}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="h-8 w-8 sm:h-9 sm:w-9"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm truncate px-2 pb-2 font-medium text-foreground">{file.file.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="w-full sm:flex-1"
            >
              <Button
                onClick={handleConversion}
                disabled={selectedFiles.length === 0 || isConverting}
                className="w-full h-12 text-lg font-semibold rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Convert {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
                  </>
                )}
              </Button>
            </motion.div>
            {selectedFiles.length > 0 && (
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isConverting}
                  className="w-full h-12 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}